export interface JwtToken {
  jti: string, // Unique ID
  sub: string, // User email
  iss: string, // Issuer
  iat: Number, // Issued at (seconds since UNIX epoch
  exp: Number, // Expires at (seconds since UNIX epoch
  token: string // Raw token
}
