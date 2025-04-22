const { body, validationResult } = require('express-validator');

const validateEvent = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must be less than 255 characters'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Webinar', 'Workshop', 'Conference'])
    .withMessage('Invalid category type'),

  body('is_paid')
    .isBoolean()
    .withMessage('is_paid must be a boolean value'),

  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value, { req }) => {
      if (req.body.is_paid && (!value || value <= 0)) {
        throw new Error('Price is required for paid events and must be greater than 0');
      }
      return true;
    }),

  body('start_datetime')
    .notEmpty()
    .withMessage('Start datetime is required')
    .isISO8601()
    .withMessage('Invalid date format')
    .custom(value => {
      const eventDate = new Date(value);
      const now = new Date();
      if (eventDate <= now) {
        throw new Error('Event start date must be in the future');
      }
      return true;
    }),

  body('duration')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Duration must be a positive number'),

  body('description')
    .optional()
    .trim(),

  body('streaming_link')
    .trim()
    .notEmpty()
    .withMessage('streaming_link is required'),

  body('cover_image')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid cover image URL format'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateEvent;