import plantResolvers from "./plant";
import userResolvers from "./user";
import { merge } from "lodash";

let resolvers = {};

resolvers = merge(resolvers, plantResolvers, userResolvers);
export { resolvers };
