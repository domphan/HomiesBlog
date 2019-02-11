import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import { PostPatchInterface } from '../common/types';
import { BaseController } from './base';
import { omit } from 'lodash';

export class PostController extends BaseController {

    public createPost = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.db.user.findOneOrFail(req.user[0].id)
            .catch((err: any) => {
                res.status(BAD_REQUEST).json({ error: 'user doesn\'t exist' });
            });
        const { title, textContent, mediaUrl } = req.body;
        const options = { title, textContent, mediaUrl, user };
        const post = await this.db.post.create(options);
        const newPost = await this.db.post.save(post)
            .catch((err: any) => res.status(BAD_REQUEST).json({ error: 'failed to create post' }));
        return res.json(newPost);
    }

    public getAllPostsFromUser = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user[0].id;
        const posts = await this.db.post.createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .where('user.id = :id', { id: userId })
            .getMany()
            .catch((err: any) => next(err));
        res.json(posts);
    }

    public getPost = async (req: Request, res: Response, next: NextFunction) => {
        const post = await this.db.post.findOneOrFail(req.params.id)
            .catch((err: any) => {
                res.status(BAD_REQUEST).json({ error: 'post doesn\'t exist' });
            });
        return res.json(post);
    }

    public deletePost = async (req: Request, res: Response, next: NextFunction) => {
        const post = await this.db.post.findOneOrFail(req.params.id)
            .catch((err: any) => res.status(BAD_REQUEST).json({ error: 'post doesn\'t exist' }));
        this.db.post.delete(post.id)
            .catch((err: any) => res.status(BAD_REQUEST).json({ error: 'unable to delete' }));
        return res.status(204).json({});
    }

    public updatePost = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user[0].id;
        const owner = await this.db.post.createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .where('user.id = :id', { id: userId })
            .andWhere('post.id = :postId', { postId: req.params.id })
            .getOne()
            .catch((err: any) => res.status(BAD_REQUEST).json({ error: 'post cannot be found' }));
        await req.body.map((patchOptions: PostPatchInterface) => {
            this._patch(patchOptions.op, patchOptions.path, patchOptions.value, req.params.id)
                .catch((err: any) => res.status(BAD_REQUEST).json({ error: err.message }));
        });
        res.json(await this.db.post.findOneOrFail(req.params.id));
    }

    private _patch = async (op: string, path: string, value: string, id: string) => {
        const pathOptions: string[] = ['/textContent', '/title', '/mediaUrl'];
        if (!pathOptions.includes(path)) {
            throw new Error('invalid body parameters');
        }
        const trimmedPath = path.replace('/', '');
        if (op === 'replace') {
            this.db.post.update(id, { [trimmedPath]: value });
        } else if (op === 'remove') {
            this.db.post.update(id, { [trimmedPath]: '' });
        } else {
            throw new Error('not a valid operation');
        }
    }
}
