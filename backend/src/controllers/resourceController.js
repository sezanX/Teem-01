const LearningResource = require('../models/LearningResource');

const createResource = async (req, res, next) => {
  try {
    const resource = await LearningResource.create({
      ...req.body,
      createdBy: req.user._id,
    });

    return res.status(201).json({ message: 'Resource created', resource });
  } catch (error) {
    return next(error);
  }
};

const listResources = async (req, res, next) => {
  try {
    const resources = await LearningResource.find({ isPublished: true }).populate('createdBy', 'name email role');
    return res.status(200).json({ resources });
  } catch (error) {
    return next(error);
  }
};

const getResourceById = async (req, res, next) => {
  try {
    const resource = await LearningResource.findById(req.params.id).populate('createdBy', 'name email role');

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    return res.status(200).json({ resource });
  } catch (error) {
    return next(error);
  }
};

const updateResource = async (req, res, next) => {
  try {
    const resource = await LearningResource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    return res.status(200).json({ message: 'Resource updated', resource });
  } catch (error) {
    return next(error);
  }
};

const deleteResource = async (req, res, next) => {
  try {
    const resource = await LearningResource.findByIdAndDelete(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    return res.status(200).json({ message: 'Resource deleted' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createResource,
  listResources,
  getResourceById,
  updateResource,
  deleteResource,
};
