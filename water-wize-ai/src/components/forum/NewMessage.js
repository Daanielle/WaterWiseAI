import { useState, useEffect } from "react"
import { addNewForumMessage, getLoggedInUserId, getLoggedInUserImage } from '../../apiRequests'
import InputField from "../inputs/InputField"
import CustomButton from "../CustomButton"
import TitleButton from "../TitleButton"



const NewMessage = () => {
    const [userId, setUserId] = useState('')
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [rec, setRec] = useState('')

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userId = await getLoggedInUserId();
                const userImage = await getLoggedInUserImage();
                if (!userId) {
                    setUserId('0');
                    setImage('')
                }
                else {
                    setUserId(userId);
                    setImage(userImage);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserDetails();
    }, []);

    const saveMessage = async () => {
        try {
            let message = {
                userId, image, title, body, rec
            }
            let status = await addNewForumMessage(message);
            console.log("Message saved successfully:", status);
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
    

    return (
        <div >
            <TitleButton style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}>Add a new message</TitleButton>
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
        </div>
    )
}

export default NewMessage