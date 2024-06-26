import { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";

import PageContainer from "../components/PageContainer";
import TitleButton from "../components/TitleButton";
import CustomButton from "../components/CustomButton";
import MesssagesAcordion from "../components/forum/MessagesAcordion";
import NewMessage from "../components/forum/NewMessage";
import useDictionary from "../resources/Dictionary/Dictionary";
import { getAllForumMessages, getLoggedInUserId } from "../apiRequests";


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};


function Forum() {
  const [openNewMessageModal, setOpenNewMessageModal] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const messages = await getAllForumMessages();
        setAllMessages(messages);
        const id = await getLoggedInUserId();
        setUserId(id);
  
        // console.log(messages)
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllMessages();
  }, [openNewMessageModal]);

  const dict = useDictionary();

  const handleOpenNewMessageModal = () => setOpenNewMessageModal(true);
  const handleCloseNewMessageModal = () => setOpenNewMessageModal(false);

  return (
    <PageContainer>
      <TitleButton label={dict.forum}></TitleButton>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '80%', paddingBottom: '20px' }}>
        <div style={{ width: '300px' }}>
          <CustomButton onClick={handleOpenNewMessageModal} label="New Message" disabled={!userId} disabledTooltip={"Log in in order to add a new message"}/>
        </div>
      </div>
      <MesssagesAcordion messages={allMessages}/>
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
