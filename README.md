# HomiesBlog

Homies blog is a social media webapp for homies to stay in touch. You can add homies, share pictures with homies, like homies' pictures, and share events with homies.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Docker must be installed
You must have your own S3 and Cloudfront credentials in a keys.json file
```

### Installing
```
Clone the repo and run the docker-compose build command in the root directory
```

Run npm start in the client directory

```
Visit the webapp on localhost:3000, use the API on localhost:3001
```

## Built With

* Express backend written in Typescript
* PostgreSQL database with TypeORM
* React-Redux with Material-UI
* AWS Cloudfront and S3 for image storage and CDN w/ image resizing on the fly with a Lambda function



## Authors

* **Dominic Phan** - *Fullstack* - [Domphan](https://github.com/Domphan)
