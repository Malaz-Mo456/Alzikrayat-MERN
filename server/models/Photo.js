import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileName: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    dateTime: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;