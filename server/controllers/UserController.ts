import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { BAD_REQUEST, UNAUTHORIZED, ACCEPTED } from 'http-status-codes';
import { BaseController } from './base';
import { UserRequestInterface } from '../common/types';
import { runInNewContext } from 'vm';

//todo: fix try catches, remove more stuff from payload
export class UserController extends BaseController {

    public whoIs = async (req: UserRequestInterface, res: Response, next: NextFunction) => {
        const user = await this.db.user.findOne(req.user[0].id);
        res.json(user);
    }

    /*
    Body Data: { firstName, lastName, birthday, email, password }
    Signs a user up for a new account.
     */
    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, birthday, username, email, password } = req.body;
        const user: any = {
            firstName,
            lastName,
            birthday,
            username,
            email,
            password
        };
        // Check if email exists already
        const emailLookup = await this.db.user.findOne({ email: user.email })
        if (emailLookup) {
            return res.status(400).json({ msg: "user already exists" })
        }
        // hash password then store new user
        user.password = await this._hashPassword(user.password);
        await this.db.user.save(user)
        res.json(user);
    }

    /*
    Body Data: { username, password }
    Logs the user in by returning a JWT to be used with future requests
    */
    public login = async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;
        const user = await this.db.user.findOneOrFail({ username })
            .catch((err: any) => {
                res.status(404).json({ error: 'user not found' })
                next(err);
            });
        const matching = await bcrypt.compare(password, user.password)
            .catch((err: any) => {
                res.status(BAD_REQUEST).json({ error: 'passwords do not match' });
                next(err);
            });
        if (!matching) {
            return res.status(BAD_REQUEST).json({ error: 'passwords do not match' });
        }
        const payload: object = {
            id: user.id
        };
        const token: string = await jwt.sign(payload, 'secretsecret', {
            expiresIn: 3600
        });
        res.json({
            success: true,
            token: `Bearer ${token}`
        });
    }


    public changePassword = async (req: Request, res: Response, next: NextFunction) => {
        const { oldPassword, newPassword } = req.body;
        const { id } = req.user[0];
        // Check if oldPassword matches
        try {
            const user = await this.db.user.findOne({ id });
            const matching = await bcrypt.compare(oldPassword, user.password)

            if (!matching) {
                // If it doesn't, send back error
                return res.status(UNAUTHORIZED).json({ error: 'old password not valid' });
            }
            // Save new password in DB
            const hashedNewPassword = await this._hashPassword(newPassword)
            await this.db.user.update(id, { password: hashedNewPassword });
            res.status(ACCEPTED).json(user)
        } catch (err) {
            res.status(UNAUTHORIZED).json({ error: 'invalid auth' });
            next(err);
        }
    }

    // TODO: JAMES
    public changeBirthday = async (newBirthday: Date) => {

    }

    private _hashPassword = async (password: string): Promise<string> => {
        const SALT_ROUNDS: number = 12;
        try {
            const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
            const hashWord: string = await bcrypt.hash(password, salt);
            return hashWord;
        } catch (err) {
            // TODO: Better error handling
            throw new Error('hash failed');
        }
    }
}