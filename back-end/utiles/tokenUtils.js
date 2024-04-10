export const userId = async (req, res) => {
  try {
    const { _id } = req.query;

    // Verify token
    const getUserId = verifyId(_id);

    if (!getUserId || !getUserId.email) {
      return res.status(400).json({ message: "Invalid or user Id" });
    }

    const user = await userModel.findOneAndUpdate(
      { email: getUserId.email, emailVerificationToken: token },
      { $set: { emailVerified: true, emailVerificationToken: null } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or already verified" });
    }

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
