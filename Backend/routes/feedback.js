const router = require("express").Router();
const Feedback = require('../models/feedback');


// Create User
router.route("/add").post((req, res) => {
  const { suggestions, comments } = req.body;

  if (!suggestions || !comments ) {
    return res.status(400).json({ error: 'Invalid or missing fields.' });
  }

  const newFeedback = new Feedback({ suggestions, comments });

  newFeedback.save()
    .then(() => res.status(201).json({ message: 'Feedback added successfully.' }))
    .catch((err) => res.status(500).json({ error: 'Error adding user', details: err }));
});



module.exports = router;
