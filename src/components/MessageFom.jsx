import { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";

const MessageForm = (props) => {
    const [ value , setValue ] = useState("");
    const { chatId, creds } = props; //current chat ID and auth object
    // console.log(props);

    const handleChange = (event) => {
        //using setValue hook to set typed input as value 
        setValue(event.target.value);

        //set isTyping to current user
        isTyping(props, chatId);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); //to restrain browser from refreshing the page on submit
        const text = value.trim();

        if (text.length > 0) {
            sendMessage(creds, chatId, { text });
        }
        
        setValue(""); //setting input value to empty string after submit
    };

    //to send image files
    const handleUpload = (event) => {
        sendMessage(creds, chatId, { files: event.target.files, text: "" });
    }
    

    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <input
                className="message-input"
                placeholder="Type a message"
                value={value}
                onChange={handleChange} 
                onSubmit={handleSubmit}
            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon" />
                </span>
            </label>
            <input 
                type="file"
                multiple={false}
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleUpload}
            />
            <button type="submit" className="send-button"> 
                <SendOutlined className="send-icon" />
            </button>
        </form>
    )
}

export default MessageForm;