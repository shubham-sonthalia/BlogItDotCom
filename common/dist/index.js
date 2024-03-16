"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlogPostData = exports.BlogPostData = exports.SignInData = exports.SignUpData = void 0;
const zod_1 = require("zod");
exports.SignUpData = zod_1.z.object({
    name: zod_1.z.string().max(30),
    password: zod_1.z.string().max(16).min(8),
    email: zod_1.z.string().email(),
});
exports.SignInData = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(16),
});
exports.BlogPostData = zod_1.z.object({
    title: zod_1.z.string().max(100),
    content: zod_1.z.string(),
});
exports.UpdateBlogPostData = zod_1.z.object({
    title: zod_1.z.string().max(100),
    content: zod_1.z.string(),
    id: zod_1.z.string(),
});
