import { Hono } from "hono";
import { user } from "./routes/user";
import { blog } from "./routes/blog";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { zValidator } from "@hono/zod-validator";

type Variables = {
  userId: string;
  prisma: any;
};
const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
  Variables: Variables;
}>().basePath("/api/v1");

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
