type UUIDLength = 4 | 8 | 12 | 14 | 16 | 32 | 64 | 128;

// a simple way to generate UUID with base length of 64
const UUID64 = (length: UUIDLength = 12) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export { UUID64 };
