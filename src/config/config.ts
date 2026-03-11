import dotenv from "dotenv";

dotenv.config();

class Config {
  port: number = parseInt(process.env.PORT || "5555", 10);
  databaseUrl: string =
    process.env.DATABASE_URL || "mongodb://localhost:27017/medcast";

  constructor() {
    this.port = parseInt(process.env.PORT || "5555", 10);
    this.databaseUrl =
      process.env.DATABASE_URL || "mongodb://localhost:27017/medcast";
  }
}

const config = new Config();

export default config;
