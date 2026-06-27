const PromptChallenge = require('../models/PromptChallenge');

const createChallenge = async (req, res, next) => {
  try {
    const challenge = await PromptChallenge.create({
      ...req.body,
      createdBy: req.user._id,
    });

    return res.status(201).json({ message: 'Challenge created', challenge });
  } catch (error) {
    return next(error);
  }
};

const listChallenges = async (req, res, next) => {
  try {
    const challenges = await PromptChallenge.find().populate('createdBy', 'name email role');
    return res.status(200).json({ challenges });
  } catch (error) {
    return next(error);
  }
};

const getChallengeById = async (req, res, next) => {
  try {
    const challenge = await PromptChallenge.findById(req.params.id).populate('createdBy', 'name email role');

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    return res.status(200).json({ challenge });
  } catch (error) {
    return next(error);
  }
};

const updateChallenge = async (req, res, next) => {
  try {
    const challenge = await PromptChallenge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    return res.status(200).json({ message: 'Challenge updated', challenge });
  } catch (error) {
    return next(error);
  }
};

const deleteChallenge = async (req, res, next) => {
  try {
    const challenge = await PromptChallenge.findByIdAndDelete(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    return res.status(200).json({ message: 'Challenge deleted' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createChallenge,
  listChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
};
