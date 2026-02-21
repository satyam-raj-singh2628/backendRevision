const {
  getAllusers,
  getUserById,
  updateUser,
  deleteUser,
  createNewUser,
} = require("../controllers/userController");

const router = require("express").Router();

// routes

router.route("/").get(getAllusers).post(createNewUser);

router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
