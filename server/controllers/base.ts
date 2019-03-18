import { User, Post, Comment } from '../models/';
import { getConnection } from 'typeorm';

interface IDatabase {
    user: any;
    post: any;
    comment: any;
}

export class BaseController {
    public db: IDatabase
    constructor() {
        if (!this.db) {
            this.db = new DB()
        }
    }
}

class DB {
    public user: any;
    public post: any;
    public comment: any;

    constructor() {
        this.user = getConnection().getRepository(User);
        this.post = getConnection().getRepository(Post);
        this.comment = getConnection().getRepository(Comment);
    }
}