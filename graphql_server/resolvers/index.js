import plantResolvers from "./plant";
import userResolvers from "./user";
import { merge } from "lodash";

let resolvers = {};

console.log("in index: ");
resolvers = merge(resolvers, plantResolvers, userResolvers);
console.log(resolvers);
export { resolvers };
