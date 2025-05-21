export function toBase64(str: string) {
    return btoa(String.fromCharCode(...new Uint8Array(new TextEncoder().encode(str))));
}

export function fromBase64(str: string) {
    const binaryString = atob(str);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
}