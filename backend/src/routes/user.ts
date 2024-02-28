import { PrismaClient, User } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

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
  datasourceUrl: c.env?.DATABASE_URL,
}).$extends(withAccelerate());

export async function createUser(user: User) {
  const hashedPwd = await generateHash(user.password);
  await prisma.user.create({
    data: {
      email: user.email,
      password: hashedPwd,
    },
  });
}
