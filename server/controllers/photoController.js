import Photo from '../models/Photo.js';
import Comment from '../models/Comment.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use the uploads folder inside the server directory
const uploadDirectory = path.resolve(__dirname, '../uploads');

export const getPhotos = async (req, res, next) => {
    try {
        const photos = await Photo.find()
            .populate('userId', 'firstName lastName')
            .sort({ dateTime: -1 });

        res.status(200).json({
            success: true,
            photos
        });
    } catch (error) {
        next(error);
    }
};

export const getPhotoById = async (req, res, next) => {
    try {
        const photo = await Photo.findById(req.params.id)
            .populate('userId', 'firstName lastName');

        if (!photo) {
            return res.status(404).json({
                success: false,
                message: 'Photo not found'
            });
        }

        res.status(200).json({
            success: true,
            photo
        });
    } catch (error) {
        next(error);
    }
};

export const uploadPhoto = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please select an image'
            });
        }

        const photo = await Photo.create({
            userId: req.user._id,
            fileName: req.file.filename,
            title: req.body.title,
            description: req.body.description || ''
        });

        await photo.populate('userId', 'firstName lastName');

        res.status(201).json({
            success: true,
            message: 'Photo uploaded successfully',
            photo
        });
    } catch (error) {
        next(error);
    }
};

export const deletePhoto = async (req, res, next) => {
    try {
        const photo = await Photo.findById(req.params.id);

        if (!photo) {
            return res.status(404).json({
                success: false,
                message: 'Photo not found'
            });
        }

        // Check if the current user owns the photo
        if (photo.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You can only delete your own photos'
            });
        }

        // Delete the image file from the server
        const imagePath = path.join(uploadDirectory, photo.fileName);

        try {
            await fs.unlink(imagePath);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        // Delete the comments related to this photo
        await Comment.deleteMany({ photoId: photo._id });

        // Delete the photo record from the database
        await photo.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Photo deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};




