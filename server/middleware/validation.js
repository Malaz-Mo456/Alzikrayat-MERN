import Joi from 'joi';

const registerSchema = Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    location: Joi.string().allow('').optional(),
    description: Joi.string().allow('').optional(),
    occupation: Joi.string().allow('').optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const photoSchema = Joi.object({
    title: Joi.string().trim().min(2).max(100).required(),
    description: Joi.string().allow('').max(1000).optional()
});

const commentSchema = Joi.object({
    comment: Joi.string().trim().min(1).max(1000).required()
});

const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details.map(item => item.message).join(', ')
            });
        }

        req.body = value;
        next();
    };
};

export const validateRegister = validate(registerSchema);
export const validateLogin = validate(loginSchema);
export const validatePhoto = validate(photoSchema);
export const validateComment = validate(commentSchema);