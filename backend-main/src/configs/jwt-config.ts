const JwtConfigs = {
  clientJwtSecret: process.env.CLIENT_JWT_SECRET!,
  clientJwtExpiry: process.env.CLIENT_JWT_EXPIRY!,
  providerJwtSecret: process.env.PROVIDER_JWT_SECRET!,
  providerJwtExpiry: process.env.PROVIDER_JWT_EXPIRY!,
  adminJwtSecret: process.env.ADMIN_JWT_SECRET!,
  adminJwtExpiry: process.env.ADMIN_JWT_EXPIRY!,
  clientRefreshTokenExpiry: process.env.CLIENT_REFRESH_TOKEN_EXPIRY!,
  clientRefreshTokenSecret: process.env.CLIENT_REFRESH_TOKEN_SECRET!,
  providerRefreshTokenExpiry: process.env.PROVIDER_REFRESH_TOKEN_EXPIRY!,
  providerRefreshTokenSecret: process.env.PROVIDER_REFRESH_TOKEN_SECRET!,
  adminRefreshTokenExpiry: process.env.ADMIN_REFRESH_TOKEN_EXPIRY!,
  adminRefreshTokenSecret: process.env.ADMIN_REFRESH_TOKEN_SECRET!,
};

export default JwtConfigs;
