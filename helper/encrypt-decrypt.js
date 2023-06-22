import cryptoJs from "crypto-js";

export async function encrypt(text, key) {
  if (text)
    return cryptoJs.AES.encrypt(JSON.stringify(text), key.trim()).toString();
}
export async function decrypt(text, key) {
  if (text) {
    return JSON.parse(
      cryptoJs.AES.decrypt(text, key.trim()).toString(cryptoJs.enc.Utf8)
    );
  }
}

// export { encrypt, decrypt };
