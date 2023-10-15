# Contacts App

This is a simple contacts app built with JavaScript, npm, and TypeScript. The app allows users to create, read, update, and delete contacts, and uses encryption to protect sensitive data.

## Installation

To install the app, first clone the repository:

```
git clone 'github-repo-link'
```

Then, navigate to the project directory and install the dependencies:

```bash
$ cd contacts-app
$ pnpm install
```

## Usage

To start the app, run the following command:

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

This will start the app on `http://localhost:3000`.

## Encryption

The app uses encryption to protect sensitive data such as phone numbers and names. Encryption is handled by the `EncryptionService` class thet implements crypto from node, which provides methods for encrypting and decrypting data.

## Documentation

The api documentation can be found on localhost:3000/documentation after starting the application

## Environment Variables

The environment variables are set on the .env.example. Encryption Keys are necessary for the application to work as expected.
