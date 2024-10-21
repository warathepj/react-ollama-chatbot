import { useState, useRef, useEffect } from 'react';
import { io } from "socket.io-client";

//import './ChatUI.css'; // Assuming a CSS file for styling

const ChatUI = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'Bot',
      text: 'Hello there! How can I assist you today?',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messageRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        sender: 'User',
        text: newMessage,
      };
      const updatedMessages = [...messages, newMessageObj];
      setMessages([...messages, newMessageObj]);
      setNewMessage('');

      // Simulate a bot response (replace with actual bot logic)
      const botResponse = {
        sender: 'Bot',
        text: 'I understand your request. I\'ll do my best to help.',
      };
      setTimeout(() => {
        setMessages([...updatedMessages, botResponse]);
        messageRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 1000); // Adjust the delay as needed
    }
  };
// TODO:
  useEffect(() => {
    const newSocket = io("http://localhost:3007");
  
    // Handle incoming messages
    newSocket.on('message', (data) => {
      console.log('Received message:', data);
    });
  
    // Send a message
    newSocket.emit('myEvent', 'Hello from the client!');
  
    // Clean up the connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="chat-ui">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'Bot' ? 'bot-message' : 'user-message'}`}
          >
            <div className={`flex max-w-[70%] ${
              message.sender === 'Bot' ? 'flex-row' : 'flex-row-reverse'
            }`}>
              {message.sender === 'Bot' && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-2">
                  {/* Replace with actual avatar image */}
                  <img src="https://example.com/avatar.png" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              )}
              <div className={`px-4 py-2 rounded-lg ${
                message.sender === 'Bot' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                {message.text}
              </div>
              {message.sender === 'User' && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ml-2">
                  {/* Replace with actual user avatar image */}
                  <img src="https://example.com/user-avatar.png" alt="User Avatar" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messageRef} />
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>



      
    </div>
  );
};

export default ChatUI;