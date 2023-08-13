# Fivemin Webservice

The repository contains a collection of serverless cloud functions designed to serve dynamic pages for Fivemin website.

## Requirements

- [Node.js 18](https://nodejs.org/en/download)
- [Vercel CLI 31](https://vercel.com/docs/cli)

## Installation

1. Clone the repository:

```shell
git clone https://github.com/rajatxs/fivemin-cloud-functions.git fivemin
```

2. Change directory to the cloned repository:

```shell
cd fivemin
```

3. Install the required dependencies:

```shell
npm install
```

4. Set the following environment variables to your system or add them in the **.env** file:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| ```FIVEMIN_HOST_URL``` | Host URL | Yes | - |
| ```FIVEMIN_MONGODB_CONN_URL``` | [MongoDB Connection URL](https://www.mongodb.com) | Yes | - |
| ```FIVEMIN_MONGODB_DB_NAME``` | [MongoDB Database Name](https://www.mongodb.com) | Yes | - |
| ```FIVEMIN_CLOUDINARY_ID``` | [Cloudinary Public ID](https://cloudinary.com) | Yes | - |

## Usage

Start development server:

```shell
vercel dev
```

Deploy changes:

```shell
vercel
```

For more information or inquiries, please contact the project owner: Rajat (rxx256@outlook.com)
