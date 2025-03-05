import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const SaveTemplate = mutation({
  args: {
    tid: v.string(),
    design: v.any(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db.insert("emailTemplates", {
        tid: args.tid,
        design: args.design,
        email: args.email,
      });
      return result; // Returns the inserted document ID
    } catch (e) {
      throw new Error(`Failed to save template: ${e.message}`);
    }
  },
});

export const GetTemplateDesign = query({
  args: {
    email: v.string(),
    tid:v.string()
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query('emailTemplates')
      .filter((q) => q.and(q.eq(q.field('tid'), args.tid), q.eq(q.field('email'), args.email)))
      .collect();

    return result;
  }
})