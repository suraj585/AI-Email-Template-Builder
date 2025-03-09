import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// SaveTemplate Mutation
export const SaveTemplate = mutation({
  args: {
    tid: v.string(), // Template ID
    design: v.any(), // Design structure (JSON)
    email: v.string(), // User's email
    description: v.optional(v.string()), // Optional description
  },
  handler: async (ctx, args) => {
    try {
      // Insert the template into the database
      const result = await ctx.db.insert("emailTemplates", {
        tid: args.tid,
        design: args.design,
        email: args.email,
        description: args.description, // Include description if provided
      });
      return result; // Returns the inserted document ID
    } catch (e) {
      throw new Error(`Failed to save template: ${e.message}`);
    }
  },
});

// GetTemplateDesign Query
export const GetTemplateDesign = query({
  args: {
    email: v.string(), // User's email
    tid: v.string(), // Template ID
  },
  handler: async (ctx, args) => {
    try {
      // Query the database for the template
      const result = await ctx.db
        .query("emailTemplates")
        .filter((q) =>
          q.and(
            q.eq(q.field("tid"), args.tid), // Match template ID
            q.eq(q.field("email"), args.email) // Match user email
          )
        )
        .collect();

      // Return the first matching template (or an empty object if none found)
      return result[0] || {};
    } catch (e) {
      console.error("Error fetching template design:", e);
      return {}; // Fallback to an empty object on error
    }
  },
});

export const UpdateTemplateDesign = mutation({
  args: {
    tid: v.string(),
    design: v.any(), //Email Template Design
  },
  handler: async (ctx, args) => {
    //Get Doc Id
    const result = await ctx.db
      .query("emailTemplates")
      .filter((q) => q.eq(q.field("tid"), args.tid))
      .collect();

    const docId = result[0]._id;
    console.log(docId);
    //Update that DocId
    await ctx.db.patch(docId, {
      design: args.design,
    });
  },
});

export const GetAllUserTemplate = query({
  args: {
    email:v.string()
  },
  handler:async(ctx, args) => {
    const result = await ctx.db.query('emailTemplates')
      .filter(q => q.eq(q.field('email'), args.email))
      .collect();

    return result;
  }
})