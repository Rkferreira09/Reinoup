/**
 * Non-cryptographic obfuscation only — this app has no server, so there is no real
 * secret to protect. This just avoids keeping the raw PIN/password string in localStorage.
 */
export function simpleHash(input: string): string {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}
