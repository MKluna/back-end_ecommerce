import bcrypt from "bcrypt";
import { COLLECTION, MESSAGES } from "./../config/constants";
import { IResolvers } from "@graphql-tools/utils";
import JWT from "../lib/jwt";

const resolversQuery: IResolvers = {
  Query: {
    async users(_, __, { db }) {
      try {
        return {
          status: true,
          message: "successful",
          users: await db.collection(COLLECTION.USERS).find().toArray(),
        };
      } catch (error) {
        console.error(error);
        return {
          status: false,
          message: "error",
          users: [],
        };
      }
    },
    async login(_, { email, password }, { db }) {
      try {
        const user = await db.collection(COLLECTION.USERS).findOne({
          email,
        });

        if (!user) {
          return {
            status: false,
            message: "The user does not exist",
            token: null,
          };
        }

        const passwordCheck = bcrypt.compareSync(password, user.password);

        if (passwordCheck !== null) {
          delete user.password;
          delete user.birthDay;
          delete user.registerDate;
        }

        return {
          status: true,
          message: !passwordCheck ? "Check email or password" : "success",
          token: !passwordCheck ? null : new JWT().sign({ user }),
        };
      } catch (error) {
        console.error(error);
        return {
          status: false,
          message: "error",
          token: null,
        };
      }
    },
    me(_, __, { token }) {
      let info = new JWT().verify(token);
      if (info === MESSAGES.TOKEN_VERIFICATION_FAILED) {
        return {
          status: false,
          message: info,
          user: null,
        };
      }
      return {
        status: true,
        message: "user successfully authenticated",
        user: Object.values(info)[0],
      };
    },
  },
};

export default resolversQuery;
