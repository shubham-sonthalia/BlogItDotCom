import { Hono } from "hono";
import { createUser } from "./routes/user";
import { z } from "zod";
import { User } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { zValidator } from "@hono/zod-validator";
import { decode, jwt, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
}>();

const SignUpData = z.object({
  name: z.string().max(30),
  password: z.string().max(16).min(8),
  email: z.string().email(),
});

app.post("/api/v1/signup", zValidator("json", SignUpData), async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const response = await createUser(prisma, body);
  console.log("dfdfkdfjdf" + response);
  const jwtPaylod = {
    id: response.id,
  };
  const jwtToken = await sign(jwtPaylod, c.env?.JWT_SECRET);
  return c.json({ jwtToken });
});

app.post("/api/v1/signin", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("Hello Hono!");
});

export default app;
