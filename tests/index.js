const assert = require('assert');
const Crypter = require('../index');

const key = '4e9906e8fcb66cc9faf49310620ffee8f496e806cc057990209b09a433b66c1b';  // sample key
const ivLength = 16;  // sample IV length

console.log('Testing Crypter...');

const text = 'Hello, World!';
const wrongKey = '1e9906e8fcb66cc9faf49310620ffee8f496e806cc057990209b09a433b66c1b';  // wrong key
const cypher = new Crypter(key, ivLength);
const wrongCypher = new Crypter(wrongKey, ivLength);

// Test 1: Encrypt and Decrypt
const encrypted = cypher.encrypt(text);
const decrypted = cypher.decrypt(encrypted);
assert.strictEqual(decrypted, text);

// Test 2: Encrypted output is URL safe Base64
assert.ok(/^[A-Za-z0-9-_]*$/.test(encrypted), 'Encrypted output is not URL safe Base64');

// Test 3: Decryption fails with wrong key
const decryptWithWrongKey = () => wrongCypher.decrypt(encrypted);
assert.throws(decryptWithWrongKey, Error);

// Test 4: Encryption results are different even for same text due to different IVs
const encryptedAgain = cypher.encrypt(text);
assert.notStrictEqual(encrypted, encryptedAgain);

// Test 5: Tampered data fails to decrypt
const tamperedData = encrypted.slice(0, -2) + 'Aa'; // Tampering last 2 characters of encrypted data
const decryptTamperedData = () => cypher.decrypt(tamperedData);
assert.throws(decryptTamperedData, Error);

// Test 6: Encrypted output is URL safe Base64
assert.ok(/^[A-Za-z0-9-_]*$/.test(encrypted), 'Encrypted output is not URL safe Base64');

// Test 7: Encrypt and Decrypt an email address
const textWithPeriod = 'john.doe+encypt-test_0@example.com';
const encryptedWithPeriod = cypher.encrypt(textWithPeriod);
const decryptedWithPeriod = cypher.decrypt(encryptedWithPeriod);
assert.strictEqual(decryptedWithPeriod, textWithPeriod);

// Test 8: Encrypt and Decrypt a text with multiple obscure characters
const obscureText = '!@#$%^&*()_+-={}|[]\\:";\'<>?,./~`';
const encryptedObscureText = cypher.encrypt(obscureText);
const decryptedObscureText = cypher.decrypt(encryptedObscureText);
assert.strictEqual(decryptedObscureText, obscureText);

// Test 9: Missing key throws error
const missingKey = () => new Crypter();
assert.throws(missingKey, Error);

// Test 10: Invalid key throws error
const invalidKey = () => new Crypter(123);
assert.throws(invalidKey, Error);

// Test 11: Decrypting missing data throws error
const missingData = () => cypher.decrypt();
assert.throws(missingData, Error);

// Test 12: Key length is wrong throws error
const wrongKeyLength = () => new Crypter('123');
assert.throws(wrongKeyLength, Error);


console.log('All tests passed!');
