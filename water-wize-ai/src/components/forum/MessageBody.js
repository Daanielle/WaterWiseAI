import React, { useEffect, useState } from 'react';
// import { getUserById } from '../../apiRequests';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Modal, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Recommendation from '../recommendation/Recomendation';
import MessageHeader from './MessageHeader';
import { getRecommendationsById, getAllCommentsForMsg } from '../../apiRequests';
import CustomButton from './../CustomButton'
import NewComment from './NewComment';

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

export default function MessageBody({ msgId, msgBody, recId, setLoading }) {

    const [comments, setComments] = useState(null);
    const [rec, setRec] = useState(null);
    const [error, setError] = useState(null);
    const [openNewCommentModal, setOpenNewCommentModal] = useState(false);

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
    
    useEffect(() => {
        const fetchRec = async () => {
            try {
                const fetchedRec = await getRecommendationsById(recId);
                let res = [fetchedRec]
                setRec(res);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const fetchedComments = await getAllCommentsForMsg(msgId);
                setComments(fetchedComments)
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        recId && fetchRec();
        fetchComments();
        //window.location.reload()
    }, [openNewCommentModal, setLoading]);

    const handleOpenNewCommentModal = () => setOpenNewCommentModal(true);
    const handleCloseNewCommentModal = () => setOpenNewCommentModal(false);


    return (
        <div>
            {rec && <Recommendation recommendationDataRows={rec} />}
            <Typography sx={{ padding: '10px 0', lineHeight: '1.5', border: '1px solid #ccc' }}>
                {msgBody}
            </Typography>

            <div style={{ paddingTop: '30px' }}>
                <div style={{ backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'left', flex: '1' }}>
                        Comments for this message
                    </Typography>
                    <div style={{ width: '200px' }}>
                        <CustomButton onClick={handleOpenNewCommentModal} label="New Comment" secondary />
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
                                    <Typography>
                                        {comment.body}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                        :
                        <div>no comments yet!</div>
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
                    <NewComment onCloseNewComment={handleCloseNewCommentModal} message={msgId} />
                </Box>
            </Modal>
        </div>
    );
}