import { Hono } from "hono";
import { decode, jwt, sign, verify } from "hono/jwt";

type Variables = {
  userId: string;
  prisma: any;
};
export const blog = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
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

blog.post("", (c) => {
  console.log(c.get("userId"));
  return c.text("sign in route");
});

blog.put("", (c) => {
  console.log(c.get("userId"));
  return c.text("Hello Hono!");
});

blog.get(":id", (c) => {
  return c.text("Hello Hono!");
});
