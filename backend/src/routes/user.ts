import { PrismaClient, User } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import dotenv from "dotenv";
dotenv.config();

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

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

export async function createUser(user: User) {
  const hashedPwd = await generateHash(user.password);
  const res = await prisma.user.create({
    data: {
      email: user.email,
      password: hashedPwd,
      name: user.name,
    },
  });
  console.log(res);
}
