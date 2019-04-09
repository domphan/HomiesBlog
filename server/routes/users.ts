import { NextFunction, Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import * as passport from 'passport'
import { UserRequestInterface } from '../common/types';
import { UserController } from '../controllers/UserController';

const router = Router();
const user = new UserController();

// Get current user
router.get('/', passport.authenticate('jwt', { session: false }),
    (req: UserRequestInterface, res: Response, next: NextFunction) => {
        user.whoIs(req, res, next);
    });

// Create Account
router.post('/signup', [
    check('firstName')
        .isString()
        .not().isEmpty(),
    check('password').isLength({ min: 6 }),
    check('lastName')
        .isString()
        .not().isEmpty(),
    check('username')
        .isString()
        .not().isEmpty(),
    check('email').isEmail(),
    check('birthday')
        .not().isEmpty(),
    sanitizeBody('firstName').trim(),
    sanitizeBody('lastName').trim(),
    sanitizeBody('username').trim(),
    sanitizeBody('email').normalizeEmail().trim(),
    sanitizeBody('birthday').trim().toDate()

], (req: Request, res: Response, next: NextFunction) => {
    const errors: any = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    user.signUp(req, res, next);
});

// Login
router.post('/login', [
    check('email')
        .isString()
        .not().isEmpty(),
    check('password')
        .isLength({ min: 6 })
], (req: Request, res: Response, next: NextFunction) => {
    const errors: any = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    user.login(req, res, next);
});

// Change password
router.patch('/', [
    passport.authenticate('jwt', { session: false }),
    check('newPassword')
        .isString()
        .isLength({ min: 6 }),
    check('oldPassword')
        .isString()
        .isLength({ min: 6 }),
], (req: Request, res: Response, next: NextFunction) => {
    const errors: any = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    user.changePassword(req, res, next);
})

router.delete('/:id', passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response, next: NextFunction) => {
        user.deleteAccount(req, res, next);
    });

//TODO:
// Change birthday
// Add profile pic
// Add about me section
// Patch profile pic
// 

export default router;