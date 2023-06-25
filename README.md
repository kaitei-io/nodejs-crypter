# Crypter - URL Safe

## Description
Simple URL safe encryption and decryption. Uses AES-256-GCM with a random IV. 

## Use Cases
Encrypting and decrypting data in for a URL. Instead of having `login?email=email` you can have it be the encrypted version of the email. This is just a simple example but more secure than just having the email in the URL.

## Warning ⚠️ Don't use for passwords
Use bcrypt for hashing passwords instead. Encrypting passwords is not the same as hashing them. This is not a password manager.

## Secret Key
The secret key must be 32 bytes long. You can generate a random key with the following command.
```bash
openssl rand -hex 32
```

## Usage
```javascript
const Crypter = require('crypter-url-safe');
const crypter = new Crypter('db6a3d91aeaea2d91f69e91a6c033854b91d55e86393044bc9e7efb6e5bf5b2c');

const encrypted = crypter.encrypt('hello world'); // DB0Y5C38i32VVu9xk1nWY9qQ_YHo7V9UTF5hOecxHBDg57ibE7QvfGYk8p7EHo-jGv94_0iXyYEGDGPRDsrjv9z0iwHLWlT_t1PfcpC8SWGb6sXW64yblAiGOA
const decrypted = crypter.decrypt(encrypted);// hello world
```
