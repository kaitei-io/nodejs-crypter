declare class Crypter {
    constructor(
        key: string,
        ivLength: number,
    );

    encrypt(data: string): string;

    decrypt(data: string): string;
}

export = Crypter;