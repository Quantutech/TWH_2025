const WebServerConfigs = {
  port: Number(process.env.WEB_SERVER_PORT) || 3000,
  appName: process.env.APP_NAME ?? 'Telewellness Hub 31 62 siaysidi',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  frontURl: process.env.FRONT_URL ?? "https://directory.desknear.com"
};

export default WebServerConfigs;
