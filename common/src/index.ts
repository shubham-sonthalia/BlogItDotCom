import { z } from "zod";

export const SignUpData = z.object({
  name: z.string().max(30),
  password: z.string().max(16).min(8),
  email: z.string().email(),
});

export type SignupType = z.infer<typeof SignUpData>;

export const SignInData = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export type SignInType = z.infer<typeof SignInData>;

export const BlogPostData = z.object({
  title: z.string().max(100),
  content: z.string(),
});

export type BlogPostType = z.infer<typeof BlogPostData>;

export const UpdateBlogPostData = z.object({
  title: z.string().max(100),
  content: z.string(),
  id: z.string(),
});
export type UpdatePostType = z.infer<typeof UpdateBlogPostData>;
