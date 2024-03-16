import { z } from "zod";
export declare const SignUpData: z.ZodObject<{
    name: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    password: string;
    email: string;
}, {
    name: string;
    password: string;
    email: string;
}>;
export type SignupType = z.infer<typeof SignUpData>;
export declare const SignInData: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
}, {
    password: string;
    email: string;
}>;
export type SignInType = z.infer<typeof SignInData>;
export declare const BlogPostData: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type BlogPostType = z.infer<typeof BlogPostData>;
export declare const UpdateBlogPostData: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type UpdatePostType = z.infer<typeof UpdateBlogPostData>;
