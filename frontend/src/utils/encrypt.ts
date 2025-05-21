import CryptoJS from "crypto-js";

export const encryptData = (data: any, salt: string): string => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), salt).toString();
  } catch (err) {
    console.error("Encryption failed:", err);
    throw new Error("Failed to encrypt data");
  }
};

export const decryptData = <T = any>(ciphertext: string, salt: string): T | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, salt);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) return null;
    return JSON.parse(decrypted) as T;
  } catch (err) {
    console.error("Decryption failed:", err);
    return null;
  }
};