// // import axios from "axios";
// // import { useEffect } from "react";

import Header from "../Component/Chat/Header/Header";
import MessageContainer from "../Component/Chat/Message/MessageContainer";
import Sidebar from "../Component/Chat/SideLook/SideBar";

// const Chat = () => {
//   // const fetchChats = async () => {
//   //   const data = await axios.get("/api/v1/chats");
//   //   console.log(data);
//   // };

//   // useEffect(() => {
//   //   fetchChats();
//   // }, []);
//   return (
//     <div className="bg-slate-500 ">
//       <button className="btn">Button</button>
//     </div>
//   );
// };

// export default Chat;

// import MessageContainer from "../../components/messages/MessageContainer";
// import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <div>
          <Sidebar />
        </div>
        <div></div>
        <MessageContainer />
      </div>
    </>
  );
};
export default Home;
