import jwt, { JwtPayload } from "jsonwebtoken";
// import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from "../constants/constants";
import config from "../../config/config";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    _id: string;
    role: string;
  }
}
class Jwt {
  async createAccessToken(payload: object) {
    const secret = config.tokenSecret;
    return jwt.sign(payload, secret, { expiresIn: "12h" });
  }
  async createRefreshToken(payload: object) {
    const secret = config.refreshTokenSecret;
    return jwt.sign(payload, secret, { expiresIn: "7d" });
  }

  async verifyAccessToken(token: string) {
    const secret = config.tokenSecret;
    return jwt.verify(token, secret);
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload | string> {
    const secret = config.refreshTokenSecret;
    return jwt.verify(token, secret);
  }

  async createTokens(payload: object) {
    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);
    return { accessToken, refreshToken };
  }
}

export default new Jwt();
