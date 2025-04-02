import CryptoJS from "crypto-js";

// Generate Key and IV (Same as SecurekeyService)
function generateKey(): string {
    let s = String.fromCharCode(65) + String.fromCharCode(114) + String.fromCharCode(105) + String.fromCharCode(103);
    for (let i = 1; i <= 4; i++) {
        s = s + i.toString();
    }
    return s + s; // Repeat to match key length
}

function generateIV(): string {
    let s = String.fromCharCode(65) + String.fromCharCode(100) + String.fromCharCode(105) + String.fromCharCode(110);
    for (let i = 1; i <= 4; i++) {
        s = s + i.toString();
    }
    return s + s; // Repeat to match IV length
}

// Key and IV (must be 16 bytes for AES-128)
const key = CryptoJS.enc.Utf8.parse(generateKey());
const iv = CryptoJS.enc.Utf8.parse(generateIV());

// Encrypt Data
export function encryptData(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

// Decrypt Data
export function decryptData(encryptedData: string): string {
    // console.log(encryptedData);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    //  console.log(decrypted);
    return decrypted.toString(CryptoJS.enc.Utf8);
}
