import { Chat } from "../model/chat.model";
import { Message } from "../model/message.model";
import { User } from "../model/user.model";
import { asyncHandler } from "../utils/asyncHandler";
//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected

const allMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  // Validate input
  if (!chatId) {
    return res.status(400).json({ message: "Chat ID is required" });
  }

  try {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  // Validate input
  if (!content || !chatId) {
    console.error("Invalid data passed into request");
    return res
      .status(400)
      .json({ message: "Content and chat ID are required" });
  }

  // Construct the new message
  const newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    // Create the new message
    let message = await Message.create(newMessage);

    // Populate the message with sender and chat details
    message = await Message.findById(message._id)
      .populate("sender", "name pic")
      .populate("chat")
      .exec();

    // Populate chat users details
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    // Update the chat with the latest message
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    // Respond with the created message
    res.status(201).json(message);
  } catch (error) {
    // Handle errors
    console.error("Error sending message:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default { allMessages, sendMessage };
