const router = require("express").Router();
const User = require('../models/user');


// Create User
router.route("/add").post((req, res) => {
  const { name, email, address, tp_number, password } = req.body;

  if (!email ||!address|| !name || !tp_number || !password) {
    return res.status(400).json({ error: 'Invalid or missing fields.' });
  }

  const newUser = new User({ name, email, address,tp_number, password });

  newUser.save()
    .then(() => res.status(201).json({ message: 'User added successfully.' }))
    .catch((err) => res.status(500).json({ error: 'Error adding user', details: err }));
});

// Get User by ID
router.route("/getid/:id").get(async (req, res) => {
  try {
    const user = await User.findById(req.params.id.trim());
    if (user) {
      res.status(200).json({ status: "User fetched", user });
    } else {
      res.status(404).json({ status: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "Error fetching user", error: err.message });
  }
});

// Get User by email
router.route("/get/:id").get(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.id.trim() });
    if (user) {
      res.status(200).json({ status: "User fetched", user });
    } else {
      res.status(404).json({ status: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "Error fetching user", error: err.message });
  }
});

// Update User by ID
router.route("/update/:userId").put(async (req, res) => {
  const { name, email, tp_number, password } = req.body;

  try {
    const updateUser = { name, email, tp_number, password };
    const updated = await User.findByIdAndUpdate(req.params.userId, updateUser, { new: true });

    if (updated) {
      res.status(200).json({ status: "User updated", updated });
    } else {
      res.status(404).json({ status: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "Error updating user", error: err.message });
  }
});

//Delete User
router.route("/delete/:userId").delete(async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.userId);
    if (deleted) {
      res.status(200).json({ status: "User deleted" });
    } else {
      res.status(404).json({ status: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "Error deleting user", error: err.message });
  }
});


// User Login (Check)
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ status: "User exists", user });
    } else {
      res.status(404).json({ status: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "Error with login", error: err.message });
  }
});

// Fetch all Users
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ status: "Error fetching users", error: err.message }));
});

module.exports = router;
