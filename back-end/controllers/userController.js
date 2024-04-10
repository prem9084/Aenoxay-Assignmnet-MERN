import userModel from "../model/userModel.js";
import fs from "fs";
import { Resend } from "resend";
import { hashPassword, compairePassword } from "../utiles/authUtils.js";
import { generateVerificationToken } from "./verificationToekn.js";
import jwt from "jsonwebtoken";

const PORT = 3000;

export const userRegisterController = async (req, res) => {
  try {
    const { name, email, username, password, lookingto, location } = req.fields;
    const { profilePic } = req.files;
    // validatons

    if (!name) {
      return res.send({ message: "Name is Requires" });
    }
    if (!email) {
      return res.send({ message: "Email is Requires" });
    }
    if (!username) {
      return res.send({ message: "Username is Requires" });
    }

    if (!password) {
      return res.send({ message: "Password is Requires" });
    }
    if (profilePic && profilePic.size > 10000000) {
      return res.send({
        message: "Profile Picture can not be grater then 1mb",
      });
    }

    // check existing user

    const existingUser = await userModel.findOne({ email });

    // check username

    const checkusername = await userModel.findOne({ username });

    if (checkusername) {
      return res
        .status(200)
        .send({ message: "Username has already been taken" });
    }

    const verificationToken = generateVerificationToken();

    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already Register Please login" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      username,
      password: hashedPassword,
      location,
      lookingto,
      emailVerified: false,
      emailVerificationToken: verificationToken,
    });

    if (profilePic) {
      user.profilePic.data = fs.readFileSync(profilePic.path);
      user.profilePic.contentType = profilePic.type;
    }

    await user.save();

    sendVerificationEmail(email, verificationToken);

    res.status(200).send({
      success: true,
      message: "User registered successfully. Please verify your email.",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to send verification email
export const sendVerificationEmail = (to, verificationToken) => {
  const resend = new Resend("re_NCyRsAWP_8ksvxM8UPDkSVENqZHV8CJTY");

  resend.emails
    .send({
      from: "dribbble <onboarding@resend.dev>",
      to: "tinkushakya501@gmail.com",
      subject: "Email Verification",
      html: `<p>Click <a href="http://localhost:${PORT}/verify?token=${verificationToken}">here</a> to verify your email address.</p>`,
    })
    .then((response) => {
      console.log("Email sent:", response.data);
    })
    .catch((error) => {
      console.log("Error sending email:", error);
    });
};

export const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;

    // Find user by verification token
    const user = await userModel.findOne({ emailVerificationToken: token });

    if (!user) {
      return res
        .status(200)
        .send({ message: "Invalid or expired verification token." });
    }

    // Update user's email verification status
    user.emailVerified = true;
    user.emailVerificationToken = null;
    await user.save();

    res.status(200).send({ message: "Email verified successfully." });
  } catch (error) {
    console.log(error);
  }
};

// for login

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Invalide email or  Password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User is not Registerd",
      });
    }

    const match = await compairePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT, {
      expiresIn: "2d",
    });

    res.status(200).send({
      success: true,
      message: "User login Successfully",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userUpdateController = async (req, res) => {
  try {
    const { name, email, username, password, lookingto, location } = req.fields;
    const { profilePic } = req.files;
    // validatons

    if (profilePic && profilePic.size > 10000000) {
      return res
        .status(404)
        .send({ message: "Profile Picture can not be grater then 1mb" });
    }

    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
      },
      { new: true }
    );

    if (profilePic) {
      user.profilePic.data = fs.readFileSync(profilePic.path);
      user.profilePic.contentType = profilePic.type;
    }

    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// for single user

export const SingleUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-profilePic");
    res.status(200).send({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// user photo

export const getPhotoController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("+profilePic");
    if (user.profilePic.data) {
      res.set("Content-type", user.profilePic.contentType);
      return res.status(200).send(user.profilePic.data);
    }
  } catch (error) {
    console.log(error);
  }
};
