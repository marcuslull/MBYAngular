export interface JwtToken {
  aud: string | null, // Audience
  jti: string | null, // Unique ID
  sub: string | null, // User email
  iss: string | null, // Issuer
  iat: number | null, // Issued at (seconds since UNIX epoch
  exp: number | null, // Expires at (seconds since UNIX epoch
  nbf: number | null, // Not good before
  scope: string[], // Roles
  tokenString: string // Raw token
}
