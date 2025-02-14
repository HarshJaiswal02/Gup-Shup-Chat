const Message = () => {
  return (
    <div className={`chat chat-start`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white  pb-2`}>
        Not leave it in Darkness
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-black">
        DateTime....
      </div>
    </div>
  );
};

export default Message;
