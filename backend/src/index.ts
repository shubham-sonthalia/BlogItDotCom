import { Hono } from "hono";
import { createUser } from "./routes/user";
import { z } from "zod";

const app = new Hono();

const schema = z.Schema({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});

app.post("/api/v1/signup", async (c) => {
  const body = await c.req.parseBody();
  createUser();
  return c.json({
    msg: "user created successfully",
  });
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
