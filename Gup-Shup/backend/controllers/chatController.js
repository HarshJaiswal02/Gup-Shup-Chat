import { Chat } from "../model/chat.model";
import { User } from "../model/user.model";
import { asyncHandler } from "../utils/asyncHandler";

//@description     Create or fetch One to One Chat
//@route           POST /api/v1/chat/
//@access          Protected(jwt)

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // Validate input
  if (!userId) {
    console.error("UserId param not sent with request");
    return res
      .status(400)
      .json({ message: "UserId param not sent with request" });
  }

  try {
    // chat already exists between the users
    let chat = await findExistingChat(req.user._id, userId);

    // If chat exists
    if (chat.length > 0) {
      chat = await populateLatestMessageSender(chat);
      return res.status(200).json(chat[0]);
    }
    // If chat doesn't exist
    const newChat = await createNewChat(req.user._id, userId);
    res.status(200).json(newChat);
  } catch (error) {
    console.error("Error accessing chat:", error);
    res.status(400).json({ message: error.message });
  }
});

//   find existing chat between users
const findExistingChat = async (userId1, userId2) => {
  return await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId1 } } },
      { users: { $elemMatch: { $eq: userId2 } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
};

const createNewChat = async (userId1, userId2) => {
  const chatData = {
    chatName: "sender",
    isGroupChat: false,
    users: [userId1, userId2],
  };

  const createdChat = await Chat.create(chatData);
  return await Chat.findOne({ _id: createdChat._id }).populate(
    "users",
    "-password"
  );
};

//@description     Fetch all chats for a user
//@route           GET /api/v1/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
  try {
    // Fetch the chats involving the current user
    let chats = await getChats(req.user._id);

    chats = await populateLatestMessageSender(chats);

    res.status(200).send(chats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Function to fetch chats
const getChats = async (userId) => {
  return await Chat.find({ users: { $elemMatch: { $eq: userId } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });
};

// Function to populate the sender of the latest message
const populateLatestMessageSender = async (chats) => {
  return await User.populate(chats, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
};

//@description     Create New Group Chat
//@route           POST /api/v1/chat/group
//@access          Protected
const createGroupChat = asyncHandler(async (req, res) => {
  const { users: rawUsers, name: chatName } = req.body;

  // Validate input
  if (!rawUsers || !chatName) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const users = JSON.parse(rawUsers);

  if (users.length < 2) {
    return res
      .status(400)
      .json({ message: "More than 2 users are required to form a group chat" });
  }

  // Add the requesting user to the group chat
  users.push(req.user);

  try {
    // Create the group chat
    const groupChat = await createChat(chatName, users, req.user);

    const fullGroupChat = await getFullGroupChat(groupChat._id);

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const createChat = async (chatName, users, groupAdmin) => {
  return await Chat.create({
    chatName,
    users,
    isGroupChat: true,
    groupAdmin,
  });
};

const getFullGroupChat = async (chatId) => {
  return await Chat.findOne({ _id: chatId })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
};

// @desc    Rename Group
// @route   PUT /api/v1/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  if (!chatId || !chatName) {
    return res
      .status(400)
      .json({ message: "Chat ID and new chat name are required" });
  }

  try {
    const updatedChat = await updateChatName(chatId, chatName);

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateChatName = async (chatId, chatName) => {
  return await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
};

// @desc    Remove user from Group
// @route   PUT /api/v1/chat/groupremove
// @access  Protected
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    return res
      .status(400)
      .json({ message: "Chat ID and User ID are required" });
  }

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  if (!chat.groupAdmin.equals(req.user._id)) {
    return res
      .status(403)
      .json({ message: "Only the group admin can remove users" });
  }

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

export default {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
