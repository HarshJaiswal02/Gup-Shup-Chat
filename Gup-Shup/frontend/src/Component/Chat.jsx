import axios from "axios";
import { useEffect } from "react";

const Chat = () => {
  const fetchChats = async () => {
    const data = await axios.get("/api/v1/chats");
    console.log(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return <div>Chat</div>;
};

export default Chat;
