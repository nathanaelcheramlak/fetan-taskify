import dotenv from "dotenv";
dotenv.config();

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env variable: ${name}`);
    process.exit(1);
  }
  return value;
}

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5000,

  MONGODB_URL: requiredEnv("MONGODB_URL"),

  // JWT Config
  JWT_SECRET: requiredEnv("JWT_SECRET"),

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
};

export default config;
