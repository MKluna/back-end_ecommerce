import { COLLECTION } from "./../config/constants";
import { IResolvers } from "@graphql-tools/utils";
import bcrypt from "bcrypt";

const resolversMutation: IResolvers = {
  Mutation: {
    async register(_, { user }, { db }) {
      const userCheck = await db
        .collection(COLLECTION.USERS)
        .findOne({ email: user.email });

      if (userCheck !== null) {
        return {
          status: false,
          message: "This user is already registered",
          user: null,
        };
      }

      const lastUser = await db
        .collection(COLLECTION.USERS)
        .find()
        .limit(1)
        .sort({ registerDate: -1 })
        .toArray();

      if (lastUser.length === 0) {
        user.id = 1;
      } else {
        user.id = lastUser[0].id + 1;
      }

      user.password = bcrypt.hashSync(user.password, 10);
      user.registerDate = new Date().toISOString();

      return await db
        .collection(COLLECTION.USERS)
        .insertOne(user)
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

export default resolversMutation;
