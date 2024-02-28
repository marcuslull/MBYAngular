export interface JwtToken {
  jti: string | null, // Unique ID
  sub: string | null, // User email
  iss: string | null, // Issuer
  iat: Number | null, // Issued at (seconds since UNIX epoch
  exp: Number | null, // Expires at (seconds since UNIX epoch
  encryptedToken: string // Raw token
}
