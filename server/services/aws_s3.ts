import * as aws from 'aws-sdk';
import * as fs from 'fs';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as nconf from 'nconf';

nconf.argv().env().file('keys.json');
const secretAccessKey: string = nconf.get('secretAccessKey');
const accessKeyId: string = nconf.get('accessKeyId');
const region: string = nconf.get('region');

aws.config.update({
    accessKeyId,
    region,
    secretAccessKey
});

const s3 = new aws.S3();

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'homiesblogbucket',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
});
