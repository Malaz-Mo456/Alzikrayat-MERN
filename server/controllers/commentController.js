import Comment from '../models/Comment.js';
import Photo from '../models/Photo.js';

export const getPhotoComments = async (req, res, next) => {
    try {
        const photo = await Photo.findById(req.params.photoId);

        if (!photo) {
            return res.status(404).json({
                success: false,
                message: 'Photo not found'
            });
        }

        const comments = await Comment.find({
            photoId: req.params.photoId
        })
            .populate('userId', 'firstName lastName')
            .sort({ dateTime: 1 });

        res.status(200).json({
            success: true,
            comments
        });
    } catch (error) {
        next(error);
    }
};

export const addComment = async (req, res, next) => {
    try {
        const photo = await Photo.findById(req.params.photoId);

        if (!photo) {
            return res.status(404).json({
                success: false,
                message: 'Photo not found'
            });
        }

        const comment = await Comment.create({
            photoId: photo._id,
            userId: req.user._id,
            comment: req.body.comment
        });

        await comment.populate('userId', 'firstName lastName');

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment
        });
    } catch (error) {
        next(error);
    }
};