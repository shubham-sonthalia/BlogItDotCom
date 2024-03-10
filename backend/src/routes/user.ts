import { Prisma, PrismaClient, User } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import dotenv from "dotenv";
import { BodyData } from "hono/utils/body";
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

export async function createUser(prisma: any, user: BodyData) {
  const hashedPwd = await generateHash(user.password.toString());
  const res = await prisma.user.create({
    data: {
      email: user.email.toString(),
      password: hashedPwd,
      name: user.name.toString(),
    },
  });
  console.log(res);
}
