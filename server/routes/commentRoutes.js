import express from 'express';

import {
    getPhotoComments,
    addComment
} from '../controllers/commentController.js';

import protect from '../middleware/authMiddleware.js';
import { validateComment } from '../middleware/validation.js';

const router = express.Router();

router.get('/:photoId/comments', getPhotoComments);
router.post('/:photoId/comments', protect, validateComment, addComment);

export default router;