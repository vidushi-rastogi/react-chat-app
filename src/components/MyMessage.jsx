const MyMessage = ( { message } ) => {
    // to render attached image file, checking message attachments length
    const textMessage = message.text.replace(/(<([^>]+)>)/ig, '')
    if (message?.attachments?.length > 0) {
        return (
            <img 
                src={message.attachments[0].file} 
                alt="message-attachment"
                className="message-image"
                style={{ float: "right" }}
            />
        )
    }

    //render message
    return (
        <div className="my-message" 
             style={{ 
                 float: "right", 
                 marginRight: "18px", 
                 color: "white" 
                }}
        >
            {/* {message.text} */}
            {textMessage}
        </div>
    )
}

export default MyMessage;