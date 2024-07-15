import React, { useEffect, useState } from 'react';
// import { getUserById } from '../../apiRequests';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Modal, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Recommendation from '../recommendation/Recomendation';
import MessageHeader from './MessageHeader';
import { getRecommendationsById, getAllCommentsForMsg } from '../../apiRequests';
import CustomButton from './../CustomButton'
import NewComment from './NewComment';
import useDictionary from "../../resources/Dictionary/Dictionary";

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

export default function MessageBody({ msgId, msgBody, recId, addCommentHandler, userId }) {

    const [comments, setComments] = useState(null);
    const [rec, setRec] = useState(null);
    // const [error, setError] = useState(null);
    const [openNewCommentModal, setOpenNewCommentModal] = useState(false);
    const dict = useDictionary();

    useEffect(() => {
        const fetchRec = async () => {
            try {
                const fetchedRec = await getRecommendationsById(recId);
                let res = [fetchedRec]
                setRec(res);
                // setLoading(false);
            } catch (err) {
                // setError(err);
                console.error(err)
                // setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const fetchedComments = await getAllCommentsForMsg(msgId);
                setComments(fetchedComments)
                // setLoading(false);
            } catch (err) {
                // setError(err);
                console.error(err)
                // setLoading(false);
            }
        };

        recId && fetchRec();
        fetchComments();
    }, [openNewCommentModal, msgId, recId]);

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
    
    const handleOpenNewCommentModal = () => setOpenNewCommentModal(true);
    const handleCloseNewCommentModal = () => setOpenNewCommentModal(false);


    return (
        <div>
            {rec && <Recommendation recommendationDataRows={rec} onRowClick={() => {}}/>}
            <Typography sx={{ padding: '40px 0', lineHeight: '1.5', border: '1px solid var(--medium-green)', fontSize: 20}}>
                {msgBody}
            </Typography>

            <div style={{ paddingTop: '30px' }}>
                <div style={{ backgroundColor: 'var(--medium-green)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'left', flex: '1' }}>
                        {dict.CommentsMessage}
                    </Typography>
                    <div style={{ width: '200px' }}>
                        <CustomButton onClick={handleOpenNewCommentModal} label={dict.NewComment} secondary />
                    </div>
                </div>
                <div>
                    {comments && comments.length > 0 
                        ?
                        comments.map((comment, index) => (
                            <Accordion key={index} style={{ backgroundColor: '#b0d66a', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '8px' }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                >
                                    <MessageHeader title={comment.title} userId={comment.userId} time={formatDate(comment.createdAt)} isRec={false} numOfComments={-1} />
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography  sx={{ padding: '40px 0', lineHeight: '1.5', border: '1px solid var(--medium-green)', fontSize: 20}}>
                                        {comment.body}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                        :
                        <div>{dict.NoCommentsYet}</div>
                    }
                </div>
            </div>

            <Modal
                open={openNewCommentModal}
                onClose={handleCloseNewCommentModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <NewComment onCloseNewComment={handleCloseNewCommentModal} message={msgId} addCommentHandler={addCommentHandler}/>
                </Box>
            </Modal>
        </div>
    );
}
