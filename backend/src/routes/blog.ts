import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { decode, jwt, sign, verify } from "hono/jwt";

type Variables = {
  userId: string;
  prisma: any;
};

type Bindings = {
  MY_BUCKET: R2Bucket;
  JWT_SECRET: string;
  DATABASE_URL: string;
};

const BlogPostData = z.object({
  title: z.string().max(100),
  content: z.string(),
});

const UpdateBlogPostData = z.object({
  title: z.string().max(100),
  content: z.string(),
  id: z.string(),
});
export const blog = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

blog.use("*", async (c, next) => {
  const authorization = c.req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    c.status(401);
    return c.json({ error: "Unauthorized Access" });
  }
  let jwtToken = authorization.split(" ")[1];
  try {
    var decoded = await verify(jwtToken, c.env.JWT_SECRET);
    if (!decoded) {
      c.status(401);
      return c.json({ error: "Unauthorized Access" });
    }
    c.set("userId", decoded.id);
    await next();
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Something went wrong in middleware authentication.",
    });
  }
});

blog.post("", zValidator("json", BlogPostData), async (c) => {
  try {
    const body = await c.req.json();
    const prisma = c.get("prisma");
    const userId = c.get("userId");
    const res = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({ id: res.id });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Error in creating new post" });
  }
});

blog.put("", zValidator("json", UpdateBlogPostData), async (c) => {
  const body = await c.req.json();
  const prisma = c.get("prisma");
  const userId = c.get("userId");
  const updatePost = await prisma.post.update({
    where: {
      id: parseInt(body.id),
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({ msg: "Post Updated successfully!" });
});

blog.get("getById/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const prisma = c.get("prisma");
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  return c.json(post);
});

blog.get("bulk", async (c) => {
  const prisma = c.get("prisma");
  const posts = await prisma.post.findMany({});
  return c.json(posts);
});

