import dotenv from "dotenv";

dotenv.config();

class Config {
  port: number;
  databaseUrl: string;
  salt: string;
  tokenSecret: string;
  refreshTokenSecret: string;

  constructor() {
    this.port = parseInt(process.env.PORT || "5555", 10);
    this.databaseUrl =
      process.env.DATABASE_URL || "mongodb://localhost:27017/medcast";
    this.salt = process.env.SALT || "|";
    this.tokenSecret = process.env.TOKEN_SECRET || "REALLY_SECRET_KEY";
    this.refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET || "REALLY_REALLY_SECRET_KEY";
  }
}

const config = new Config();

export default config;
