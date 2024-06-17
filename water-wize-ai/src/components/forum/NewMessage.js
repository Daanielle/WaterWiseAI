import { useState } from "react"
import CustomButton from '../CustomButton'
import { addNewForumMessage } from '../../apiRequests'


const NewMessage = () => {
    const [message, setMessage] = useState({
        userId: "test",
        image: "test",
        title: "test",
        body: "test",
        likes: 4,
        recommendation: "test"
    })

    const saveMessage = async () => {
        let status = addNewForumMessage(message)
    }

    return (
        < CustomButton onClick={saveMessage} label="save" />
    )
}

export default NewMessage