"use strict";
import plantResolvers from "./plant";
import userResolvers from "./user";
import { merge } from "lodash";
import { GraphQLDateTime } from "graphql-iso-date";

const scalarResolvers = {
    DateTime: GraphQLDateTime
};

let resolvers = {};

resolvers = merge(resolvers, scalarResolvers, plantResolvers, userResolvers);
export { resolvers };
