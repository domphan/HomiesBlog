import * as jwt from 'jsonwebtoken';
import { Secret, SignOptions } from 'jsonwebtoken';

const ONE_DAY = 84600;
const ONE_WEEK = ONE_DAY * 7;

export const signJWT = (uuid, username) => {
    return jwt.sign(
        {
            id: uuid,
            username
        },
        'secretsecret',
        { expiresIn: ONE_WEEK }
    )
};

/**
 * This jwt token refresh taken from https://gist.github.com/ziluvatar/a3feb505c4c0ec37059054537b38fc48
 * It's used to refresh tokens before expiry
 */


export const tokenGenerator = (secretOrPrivateKey: Secret, secretOrPublicKey: string | Buffer, options) => {
    this.secretOrPrivateKey = secretOrPrivateKey;
    this.secretOrPublicKey = secretOrPublicKey;
    this.options = options;
}

tokenGenerator.prototype.sign = (payload: any, signOptions: SignOptions) => {
    const jwtSignOptions = Object.assign({}, signOptions, this.options);
    return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
}

tokenGenerator.prototype.refresh = (token: string, refreshOptions: any) => {
    const payload: any = jwt.verify(token, this.secretOrPublicKey, refreshOptions.verify);
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti; // We are generating a new token,
    // if you are using jwtid during signing, pass it in refreshOptions
    const jwtSignOptions: SignOptions = Object.assign({}, this.options, { jwtid: refreshOptions.jwtid });
    // The first signing converted all needed options into claims, they are already in the payload
    return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
}
