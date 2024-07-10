import { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";

import PageContainer from "../components/PageContainer";
import TitleButton from "../components/TitleButton";
import CustomButton from "../components/CustomButton";
import MesssagesAcordion from "../components/forum/MessagesAcordion";
import NewMessage from "../components/forum/NewMessage";
import useDictionary from "../resources/Dictionary/Dictionary";
import { getAllForumMessages, getLoggedInUserId } from "../apiRequests";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MessageHeader from '../components/forum/MessageHeader';
import MessageBody from '../components/forum/MessageBody';



const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '50%',
  bgcolor: 'background.paper',
  border: '2px solid var(--black-color)',
  boxShadow: 24,
  p: 4,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};


function Forum() {
  const [openNewMessageModal, setOpenNewMessageModal] = useState(false);
  const [addNewComment, setAddNewComment] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [userId, setUserId] = useState(null);

  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const messages = await getAllForumMessages();
        setAllMessages(messages);
        const id = await getLoggedInUserId();
        setUserId(id);
        setAddNewComment(false)
        // setLoading(false);
        // console.log(messages)
      } catch (err) {
        console.error(err);
        // setLoading(false);

      }
    };
    fetchAllMessages();
  }, [openNewMessageModal, addNewComment]);

  const dict = useDictionary();

  // const handleSetLoadingFalse = () => setLoading(false);
  const handleOpenNewMessageModal = () => setOpenNewMessageModal(true);
  const handleCloseNewMessageModal = () => setOpenNewMessageModal(false);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleTimeString('en-US', options);
  }

  const handleAddComment = () => {
    setAddNewComment(true)
  }

  //   {loading ? <Box sx={{ pt: 0.5 }}>
  //   <Skeleton />
  //   <Skeleton width="60%" />
  // </Box> :
  //   <MesssagesAcordion messages={allMessages} setLoading={setLoading} />
  // }

  return (
    <PageContainer>
      <TitleButton >{dict.forum}</TitleButton>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '80%', paddingBottom: '20px' }}>
        <div style={{ width: '300px' }}>
          <CustomButton onClick={handleOpenNewMessageModal} label={dict.NewMessage} disabled={!userId} disabledTooltip={dict.LogInMessage} />
        </div>
      </div>

      <div>
        {allMessages.map((message, index) => (
          <Accordion key={index} style={{ border: "2px solid var(--medium-green)",borderRadius: '15px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}sx={{
            minWidth: {
              xs: '100%', // 100% width on extra-small screens
              sm: '600px', // 600px width on small screens
              md: '800px', // 800px width on medium screens and up
            },
          }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
            >
              <MessageHeader
                //setLoading={setLoading}
                title={message.title}
                userId={message.userId}
                time={formatDate(message.createdAt)}
                isRec={message.recommendations[0]}
                numOfComments={message.numOfComments}
              //additionalComments={numOfAdditionalComments}
              />
            </AccordionSummary>
            <AccordionDetails>
              <MessageBody
                //setLoading={setLoading}
                msgBody={message.body}
                recId={message.recommendations[0]}
                msgId={message._id}
                userId={userId}
                addCommentHandler={handleAddComment}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>


      <Modal
        open={openNewMessageModal}
        onClose={handleCloseNewMessageModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <NewMessage onCloseNewMsg={handleCloseNewMessageModal} />
        </Box>
      </Modal>
    </PageContainer>
  );
}

export default Forum;
