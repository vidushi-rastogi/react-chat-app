import MessageForm from "./MessageFom";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";


const ChatFeed = (props) => {
    // console.log(props);
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat]; //if chat exist and active

    //to show read-receipts
    const renderReadReceipts = (message, isMyMessage) => {
        // select all users whose last read message is current message
        return chat.people.map((person, index) => person.last_read === message.id && (
            //display their avatars
            <div
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? "right" : "left",
                    backgroundImage: `url(${person?.person?.avatar})`
                }}
            />
        ))
        
    }

    //to render chat messages
    const renderMessages = () => {
        const keys = Object.keys(messages)  //keys = message ids
        
        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1]; //if no messages return null, or return last message index
            const isMyMessage = userName === message.sender.username; //check for message sender
        
            //to render each message
            return (
                <div key={`msg_${index}`} style={{width: "100%"}}>
                    {/* {if my message render MyMessage else render TheirMessage} */}
                    <div className="message-block">
                        {
                            isMyMessage
                            ? <MyMessage message={message} />
                            : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts"
                         style={{
                             marginRight: isMyMessage ? "18px" : "0px",
                             marginLeft: isMyMessage ? "0px" : "68px" 
                         }}                 
                    >
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            )
        })
    }

    if (!chat) return "loading...";

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-subtitle">
                    {/* usernames of the people in chat as subtitle */}
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: "100px" }}/>
            {/* form to input messsages */}
            <div className="message-form-container">
                <MessageForm { ...props } chatId={activeChat} />
            </div>
        </div>
    );

}

export default ChatFeed;