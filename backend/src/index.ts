import { Hono } from "hono";
import { user } from "./routes/user";
import { blog } from "./routes/blog";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";

type Variables = {
  userId: string;
  prisma: any;
};
type Bindings = {
  JWT_SECRET: string;
  DATABASE_URL: string;
  MY_BUCKET: R2Bucket;
};
const app = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>().basePath("/api/v1");

app.use("*", cors());

app.use("*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});

app.route("user", user);
app.route("blog", blog);

export default app;
