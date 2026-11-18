import express from 'express';

import {
    getPhotos,
    getPhotoById,
    uploadPhoto,
    deletePhoto
} from '../controllers/photoController.js';

import protect from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { validatePhoto } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getPhotos);
router.get('/:id', getPhotoById);
router.post('/', protect, upload.single('photo'), validatePhoto, uploadPhoto);
router.delete('/:id', protect, deletePhoto);

export default router;