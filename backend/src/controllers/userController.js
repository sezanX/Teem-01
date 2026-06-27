const User = require('../models/User');

const getProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio },
      { new: true, runValidators: true }
    ).select('-password');

    return res.status(200).json({ message: 'Profile updated', user: updatedUser });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
