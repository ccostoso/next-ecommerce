import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { SigninSchema } from "./schemas";
import prisma from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const parsedCredentials = SigninSchema.safeParse(credentials);
				if (!parsedCredentials.success) {
					console.log("Invalid credentials format");
					return null;
				}

				const { email, password } = parsedCredentials.data;

				try {
					const user = await prisma.user.findUnique({
						where: { email },
					});

					if (!user) {
						console.log("User not found");
						return null;
					}

					const isPasswordValid = await comparePassword(
						password,
						user.password
					);

					if (!isPasswordValid) {
						console.log("Invalid password");
						return null;
					}

					return {
						id: user.id,
						email: user.email,
					};
				} catch (error) {
					console.error("Error during authentication:", error);
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: "/auth/signin",
	},
});

export async function hashPassword(password: string) {
	const saltRounds = 10;
	return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
	password: string,
	hashedPassword: string
) {
	return await bcrypt.compare(password, hashedPassword);
}
