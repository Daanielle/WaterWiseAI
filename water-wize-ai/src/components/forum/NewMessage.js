import { useState, useEffect } from "react";
import { addNewForumMessage, getLoggedInUserId } from '../../apiRequests';
import InputField from "../inputs/InputField";
import CustomButton from "../CustomButton";
import TitleButton from "../TitleButton";
import { Modal, Box } from "@mui/material";
import AllUserRecommendations from "../AllUserRecommendations";
//import mongoose from "mongoose";


const NewMessage = ({ onCloseNewMsg  }) => {
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [recommendation, setRecommendation] = useState([]);
    const [openRecsModal, setOpenRecsModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userId = await getLoggedInUserId();
                setUserId(userId || '0');
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserDetails();
    }, []);
    //const { ObjectId } = mongoose.Types;

    const handleOpenRecsModal = () => setOpenRecsModal(true);
    const handleCloseRecsModal = () => setOpenRecsModal(false);

    const handleRowClick = (row) => {
        setSelectedRow(row);
        // let recArr = [row._id, ...recommendation]
        let recArr = [row._id];

        setRecommendation(row._id)
        setOpenRecsModal(false); // Close modal on row click
    };

    const saveMessage = async () => {
        try {
            console.log("&&&&&&&&&&&" + recommendation)
            let recArr = [recommendation]
            let message = {
                userId: userId, title:title, body:body, recommendations:recArr
            };
            let status = await addNewForumMessage(message);
            //console.log("Message saved successfully:", status);
            onCloseNewMsg();
        } catch (error) {
            console.error("Error saving message:", error);
        }
    };

    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };

    const handlBodyChange = (newBody) => {
        setBody(newBody);
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '85%',
        bgcolor: 'background.paper',
        border: '2px solid var(--black-color)',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <TitleButton style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}>Add a new message</TitleButton>
            <CustomButton label="attach a recommendation" onClick={handleOpenRecsModal} secondary />
            <InputField
                label="Title"
                value={title}
                onValueChange={handleTitleChange}
                style={{ paddingBottom: '5px' }}
            />
            <InputField
                label="Body"
                value={body}
                onValueChange={handlBodyChange}
                multiline={true}
                rows={4}
            />
            <CustomButton label="Save Message" onClick={saveMessage} style={{ width: '50%', marginTop: '20px' }} />
            {selectedRow && (
                <div>
                    <h2>Selected Recommendation Details</h2>
                    <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
                </div>
            )}
            <Modal
                open={openRecsModal}
                onClose={handleCloseRecsModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <AllUserRecommendations onRowClick={handleRowClick} />
                </Box>
            </Modal>
        </div>
    );
}

export default NewMessage;
