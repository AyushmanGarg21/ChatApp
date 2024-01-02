import BlueBubble from "./blueBubble";
import WhiteBubble from "./whiteBubble";

const ChatBox = ({messages}) => {
    return (
        <div>
            {messages.map((message) => (
                message.sender === 'AI'? <WhiteBubble user={"AI"} text={message.content}/>:<BlueBubble text={message.content}/>
            ))}
        </div>
    );
};

export default ChatBox;