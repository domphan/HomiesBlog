import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { ACCEPTED, BAD_REQUEST, UNAUTHORIZED, CREATED, NOT_FOUND } from 'http-status-codes';
import { UserRequestInterface } from '../common/types';
import { signJWT } from '../utils/jwt';
import { BaseController } from './base';
import { setCacheJWT, getAsync } from '../utils/redis';


//todo: fix try catches
export class UserController extends BaseController {

  public whoIs = async (req: UserRequestInterface, res: Response, next: NextFunction) => {
    const user = await this.db.user.findOne(req.user)
      .catch(err => next(err));
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
      .catch((err: any) => console.error(err))
    if (emailLookup) {
      return res.status(BAD_REQUEST).json({ error: 'user already exists' })
    }
    // hash password then store new user
    user.password = await this._hashPassword(user.password)
      .catch(err => next(err));
    await this.db.user.save(user)
      .catch((err: any) => next(err));
    res.status(CREATED).json(user.id);
  }

  /*
  Body Data: { username, password }
  Logs the user in by returning a JWT to be used with future requests
  */
  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await this.db.user.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    const matching = await bcrypt.compare(password, user.password)
      .catch((err: any) => next(err));
    if (!matching) {
      return res.status(BAD_REQUEST).json({ error: 'password invalid' });
    }
    const token: string = await signJWT(user.id, user.username);
    await setCacheJWT(user.id, token)
      .catch(err => next(err));
    // console.log(await getAsync(`${user.id}#JWT`));
    res.json({
      success: true,
      token: `Bearer ${token}`
    });
  }


  public changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body;
    const id = req.user;
    // Check if oldPassword matches
    const user = await this.db.user.findOne({ id: req.user })
      .catch(err => next(err));
    if (!user) {
      return res.status(NOT_FOUND).json({ error: 'user not found' });
    }
    const matching = await bcrypt.compare(oldPassword, user.password)
      .catch(err => next(err));
    if (!matching) {
      // If it doesn't, send back error
      return res.status(UNAUTHORIZED).json({ error: 'old password not valid' });
    }
    // Save new password in DB
    const hashedNewPassword = await this._hashPassword(newPassword)
      .catch(err => next(err));
    await this.db.user.update(id, { password: hashedNewPassword })
      .catch(err => next(err));
    res.status(ACCEPTED).json(user);
  }

  public deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user[0];
    // Check that id matches the one in the query
    if (id === req.params.id) {
      const user = await this.db.user.findOne({ id })
        .catch((err: any) => res.status(BAD_REQUEST).json({ error: 'user doesn\'t exist' }));
      await this.db.user.delete(user.id)
        .catch((err: any) => res.status(BAD_REQUEST).json({ error: 'unable to delete' }));
      return res.status(204).json({});
    }
    res.status(UNAUTHORIZED);
  }


  // TODO:
  public changeBirthday = async (req: Request, res: Response, next: NextFunction) => {

  }

  private _hashPassword = async (password: string): Promise<string> => {
    const SALT_ROUNDS = 12;
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