import { NextFunction, Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import * as passport from 'passport'
import { PostController } from '../controllers/PostController';


const router = Router();
const post = new PostController();

// Create new post
// Body params: title, textContent, mediaUrl (optional)
router.post('/', [
    passport.authenticate('jwt', { session: false }),
    check('title')
        .not().isEmpty()
        .isString(),
    check('textContent')
        .isString(),
    check('mediaUrl')
        .isURL()
], (req: Request, res: Response, next: NextFunction) => {
    const errors: any = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    post.createPost(req, res, next);
});

router.get('/', passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response, next: NextFunction) => {
        post.getAllPostsFromUser(req, res, next);
    });

// Get a post
router.get('/:id', passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response, next: NextFunction) => {
        post.getPost(req, res, next);
    });

router.delete('/:id', passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response, next: NextFunction) => {
        post.deletePost(req, res, next);
    });

router.patch('/:id', [
    passport.authenticate('jwt', { session: false }),
    check('title')
        .isString(),
    check('textcontent')
        .isString(),
    check('mediaUrl')
        .isURL()
], (req: Request, res: Response, next: NextFunction) => {
    post.updatePost(req, res, next);
});

export default router;
