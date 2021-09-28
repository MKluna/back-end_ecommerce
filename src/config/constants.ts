import environment from "./enviroments";

if (process.env.NODE_ENV !== "production") {
  const env = environment;
}

export const SECRET_KEY = process.env.SECRET || "LittleDarkAge";

export enum COLLECTION {
  USERS = "users",
}

export enum MESSAGES {
  TOKEN_VERIFICATION_FAILED = "Invalid Token",
}

export enum EXPIRETIME {
  H1 = 60 * 60,
  H24 = 24 * H1,
  M15 = H1 / 4,
  M20 = H1 / 3,
  D3 = H24 * 3,
}
