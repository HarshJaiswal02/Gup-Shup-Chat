import { User } from "../model/user.model";
import ApiError from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { generateAccessAndRefreshTokens } from "../utils/generateTokens";

//@description     Register new user
//@route           POST /api/v1/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ApiError(409, "User with email already exists");
  }

  const picLocalPath = req.files?.pic[0]?.path;

  if (!picLocalPath) {
    //TODO: Set something default
  }

  const pic = await uploadOnCloudinary(picLocalPath);

  if (!pic) {
    throw new ApiError(400, "Pic file is required");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic: pic.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));

  //   if (user) {
  //     res.status(201).json({
  //       _id: user._id,
  //       name: user.name,
  //       email: user.email,
  //       isAdmin: user.isAdmin,
  //       pic: user.pic,
  //       token: generateToken(user._id),
  //     });
  //   } else {
  //     res.status(400);
  //     throw new Error("User not found");
  //   }
});

//@description     Auth the user
//@route           POST /api/v1/users/login
//@access          Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const verifyPassword = await user.matchPassword(password);

  if (!verifyPassword) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

//@description     Get or Search all users
//@route           GET /api/v1/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const search = req.query.search;
  const match = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.aggregate([
    { $match: match },
    { $match: { _id: { $ne: req.user._id } } },
  ]);

  res.send(users);
});

export default { allUsers, registerUser, loginUser };
