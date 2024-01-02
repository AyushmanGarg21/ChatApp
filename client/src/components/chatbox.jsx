import BlueBubble from "./blueBubble";
import WhiteBubble from "./whiteBubble";

const ChatBox = ({messages}) => {
    return (
        <div>
            {messages.map((message,index) => (
                message.sender === 'AI'? <WhiteBubble key={index} user={"AI"} text={message.content}/>:<BlueBubble key={index} text={message.content}/>
            ))}
        </div>
    );
};

export default ChatBox;