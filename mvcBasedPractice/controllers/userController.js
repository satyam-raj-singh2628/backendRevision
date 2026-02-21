const User = require("../model/userModel");

async function getAllusers(req, res) {
  const AllUsers = await User.find({});
  return res.json(AllUsers);
}

async function getUserById(req, res) {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  return res.json(user);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { first_name, last_name, email, title, gender } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      firstName: first_name,
      lastName: last_name,
      email,
      job_title: title,
      gender,
    },
    { new: true },
  );
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  return res.json(user);
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  return res.json({ message: "User deleted successfully" });
}

async function createNewUser(req, res) {
  const body = req.body;
  if (!body.first_name || !body.last_name || !body.email || !body.title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      job_title: body.title,
      gender: body.gender,
    });

    return res
      .status(201)
      .json({ message: "new User created successfully", id: newUser._id });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAllusers,
  getUserById,
  updateUser,
  deleteUser,
  createNewUser,
};
