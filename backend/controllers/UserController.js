import User from "../model/UserModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error("All fields are required!");
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).send("Username already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User({
      username: username,
      password: hashPassword,
    });
    await newUser.save();

    const token = generateToken(res, newUser._id);
    return res.status(201).json({ username: newUser.username, token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error("All fields are required!");
    }

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(404).send("User doesn't exists!");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    const token = generateToken(res, existingUser._id);
    return res
      .status(201)
      .json({ username: existingUser.username, token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httyOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { registerUser, loginUser, logoutUser };
