export function toBase64(str: string) {
    return btoa(String.fromCharCode(...new Uint8Array(new TextEncoder().encode(str))));
}

export function fromBase64(str: string) {
    return atob(String.fromCharCode(...new Uint8Array(new TextEncoder().encode(str))));
}