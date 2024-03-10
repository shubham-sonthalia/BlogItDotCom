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
