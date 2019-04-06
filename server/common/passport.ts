import * as passportJWT from 'passport-jwt';
import { getConnection, Repository } from 'typeorm';
import { User } from '../models';
import { getAsync } from '../utils/redis';


// export const passportStrategy = (passport) => {
//     const JWTStrategy = passportJWT.Strategy;
//     const { ExtractJwt } = passportJWT;
//     const options: any = {};

//     options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//     options.secretOrKey = 'secretsecret';

//     const user: Repository<User> = getConnection().getRepository(User);
//     passport.use(new JWTStrategy(options, async (jwtPayload, done) => {
//         try {
//             const foundUser = await user.findByIds(jwtPayload.id)
//             if (foundUser) {
//                 return done(null, foundUser);
//             }
//             return done(null, false);
//         } catch (err) {
//             console.error(err);
//         }
//     }));
// };

/**
 * My strategy: check if JWT matches cache JWT. If not, fail
 * 
 */

export const passportStrategy = (passport) => {
    const JWTStrategy = passportJWT.Strategy;
    const { ExtractJwt } = passportJWT;
    const options: any = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = 'secretsecret';
    options.passReqToCallback = true;
    const user: Repository<User> = getConnection().getRepository(User);

    passport.use(new JWTStrategy(options, async (req, jwtPayload, done) => {
        try {
            const jwtFromReq: string = req.headers.authorization.replace('Bearer ', '');
            const foundUser: User[] = await user.findByIds(jwtPayload.id);
            const verified: boolean = await verifyJWTFromCache(foundUser[0].id, jwtFromReq);
            if (verified) {
                return done(null, foundUser);
            }
            return done(null, false);
        } catch (err) {
            console.error(err);
        }
    }));
};

export const verifyJWTFromCache = async (userID: string, jwtFromRequest: string) => {
    const cacheToken: string = JSON.parse(await getAsync(`${userID}#JWT`));
    if (cacheToken !== jwtFromRequest) {
        return false;
    }
    return true;
}