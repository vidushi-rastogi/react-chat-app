const TheirMessage = ( { lastMessage, message } ) => {
    //not last message or previous messages is not from current sender
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
    const textMessage = message.text.replace(/(<([^>]+)>)/ig, '');
    return (
        <div className="message-row">
            {isFirstMessageByUser && (
                <div
                    className="message-avatar"
                    // if avatar of sender exist make it as background image
                    style={{ backgroundImage: `url(${message?.sender?.avatar})` }}
                />
            )}
            {message?.attachments?.length > 0
                ? (
                    <img 
                        src={message.attachments[0].file} 
                        alt="message-attachment"
                        className="message-image"
                        style={{ marginLeft: isFirstMessageByUser ? "4px" : "48px" }}
                    />
                ) 
                : (
                    <div className="their-message" 
                         style={{ 
                            float: "left",
                            marginRight: "18px",  
                            marginLeft: isFirstMessageByUser ? "4px" : "48px"
                        }}
                    >
                        {textMessage}
                    </div>
                )

            }
            
        </div>
    )
}

export default TheirMessage;