import dotenv from "dotenv";
import { Hono } from "hono";
import { BodyData } from "hono/utils/body";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { decode, jwt, sign, verify } from "hono/jwt";
dotenv.config();

type Variables = {
  prisma: any;
};

type Bindings = {
  JWT_SECRET: string;
  DATABASE_URL: string;
  MY_BUCKET: R2Bucket;
};

export const user = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

const SignUpData = z.object({
  name: z.string().max(30),
  password: z.string().max(16).min(8),
  email: z.string().email(),
});

const SignInData = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

user.post("signup", zValidator("json", SignUpData), async (c) => {
  const body = await c.req.json();
  const response = await createUser(c.get("prisma"), body);
  const jwtPaylod = {
    id: response.id,
  };
  const jwtToken = await sign(jwtPaylod, c.env?.JWT_SECRET);
  return c.json({ jwtToken });
});

user.post("signin", zValidator("json", SignInData), async (c) => {
  const body = await c.req.json();
  const user = await getUser(c.get("prisma"), body.email, body.password);
  if (user != null) {
    const jwtPaylod = {
      id: user.id,
    };
    const jwtToken = await sign(jwtPaylod, c.env?.JWT_SECRET);
    return c.json({ jwtToken });
  }
  return c.json(
    { msg: "Either user doesn't exist or password is incorrect" },
    403
  );
});

async function generateHash(password: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    { name: "SHA-256" },
    new TextEncoder().encode(password)
  );
  const hashString = [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashString;
}

export async function createUser(prisma: any, user: BodyData) {
  const hashedPwd = await generateHash(user.password.toString());
  const res = await prisma.user.create({
    data: {
      email: user.email.toString(),
      password: hashedPwd,
      name: user.name.toString(),
    },
  });
  return res;
}

export async function getUser(prisma: any, email: string, password: string) {
  const hashed = await generateHash(password);
  const user = await prisma.user.findUnique({ where: { email: email } });
  console.log(hashed);
  console.log(user);
  if (user.password === hashed) {
    return user;
  }
}
