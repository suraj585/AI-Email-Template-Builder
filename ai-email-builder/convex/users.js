// convex/users.js
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Mutation Args:", args); // Log the arguments

    // Check if the user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    console.log("Existing Users:", user); // Log the query result

    // If the user does not exist, insert them into the database
    if (user.length === 0) {
      const result = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        picture: args.picture,
        credits: 3, // Default credits
      });
      console.log("New User Created:", result); // Log the insert result
      return result;
    }

    // Return the existing user
    return user[0];
  },
});
