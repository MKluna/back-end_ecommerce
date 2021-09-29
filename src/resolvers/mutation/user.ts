import { findOneElement, insterOneElement } from "./../../lib/db-operation";
import { COLLECTION } from ".././../config/constants";
import { IResolvers } from "@graphql-tools/utils";
import bcrypt from "bcrypt";
import { assignDocumentID } from "../../lib/db-operation";

const resolversUserMutation: IResolvers = {
  Mutation: {
    async register(_, { user }, { db }) {
      const userCheck = await findOneElement(db, COLLECTION.USERS, {
        email: user.email,
      });

      if (userCheck !== null) {
        return {
          status: false,
          message: "This user is already registered",
          user: null,
        };
      }

      user.id = await assignDocumentID(db, COLLECTION.USERS);

      user.password = bcrypt.hashSync(user.password, 10);
      user.registerDate = new Date().toISOString();

      return await insterOneElement(db, COLLECTION.USERS, user)
        .then(async () => {
          return {
            status: true,
            message: "success",
            user,
          };
        })
        .catch((err: Error) => {
          console.error(err.message);
          return {
            status: false,
            message: "Error",
            user: null,
          };
        });
    },
  },
};

export default resolversUserMutation;
