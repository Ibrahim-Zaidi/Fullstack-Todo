async function logout(req, res) {
  res
    .cookie("AccessToken", "", {
      httpOnly: true,
    })
    .status(200)
    .json({ message: "you logged out successfully !" });
}

export default logout;
