# Crypter - URL Safe

## Description
Simple URL safe encryption and decryption. Uses AES-256-GCM with a random IV. 

## Use Cases
Encrypting and decrypting data in for a URL. Instead of having `login?email=email` you can have it be the encrypted version of the email. This is just a simple example but more secure than just having the email in the URL.

## Warning ⚠️ Don't use for passwords
Use bcrypt for hashing passwords instead. Encrypting passwords is not the same as hashing them. This is not a password manager.

## Usage
```javascript
const Crypter = require('crypter-url-safe');
const crypter = new Crypter('super-secret-key');

const encrypted = crypter.encrypt('hello world');
const decrypted = crypter.decrypt(encrypted);
```

### Custom IV Length
```javascript
const Crypter = require('crypter-url-safe');
const crypter = new Crypter('super-secret-key', 64);

const encrypted = crypter.encrypt('hello world');
const decrypted = crypter.decrypt(encrypted);