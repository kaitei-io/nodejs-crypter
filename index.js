const crypto = require('crypto');

class Crypter {
    constructor(key, ivLength = 64) {
        if (!key || typeof key !== 'string') {
            throw new Error('Key is required');
        }
        this.key = Buffer.from(key, 'hex');
        this.ivLength = ivLength;
    }

    encrypt(text) {
        const iv = crypto.randomBytes(this.ivLength);
        const cipher = crypto.createCipheriv('aes-256-gcm', this.key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag();
        const encryptedBuffer = Buffer.from(encrypted, 'hex');
        const data = Buffer.concat([iv, authTag, encryptedBuffer]);

        const urlSafeData = data.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

        return urlSafeData;
    }

    decrypt(data) {
        if (!data || typeof data !== 'string') {
            throw new Error('Data is required');
        }
        
        const buffer = Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

        const iv = buffer.slice(0, this.ivLength);
        const authTag = buffer.slice(this.ivLength, this.ivLength + 16);
        const encrypted = buffer.slice(this.ivLength + 16).toString('hex');

        const decipher = crypto.createDecipheriv('aes-256-gcm', this.key, iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }
}

module.exports = Crypter;
