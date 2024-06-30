import { useState, useEffect } from "react";
import { addNewForumComment, getLoggedInUserId } from '../../apiRequests';
import InputField from "../inputs/InputField";
import CustomButton from "../CustomButton";
import TitleButton from "../TitleButton";

const NewComment = ({ onCloseNewComment, message  }) => {
    const [userId, setUserId] = useState('000000000000000000000000');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userId = await getLoggedInUserId();
                if (!userId) {
                    setUserId('0');
                } else {
                    setUserId(userId);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserDetails();
    }, []);

    const saveComment = async () => {
        try {
            let comment = {
                userId, title, body, message
            };
            let status = await addNewForumComment(comment);
            console.log("Comment saved successfully:", status);
            onCloseNewComment();
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
        <div>
            <TitleButton style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}>Add a new comment</TitleButton>
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
            <CustomButton label="Save Comment" onClick={saveComment} style={{ width: '50%', marginTop: '20px' }} />
        </div>
    );
}

export default NewComment;
