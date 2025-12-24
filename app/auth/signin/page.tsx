"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SigninSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema } from "@/lib/schemas";

export default function SignInPage() {
	const form = useForm<SigninSchemaType>({
		resolver: zodResolver(SigninSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: SigninSchemaType) => {
		console.log("Form submitted:", data);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center container mx-auto p-4">
			<Card className="w-full max-w-md p-6">
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>
						Or{" "}
						<Link
							href="/auth/signup"
							className="font-medium text-primary hover:underline"
						>
							create an account
						</Link>
						.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div className="space-y-2">
							<Label
								htmlFor="email"
								className="text-sm font-medium"
							>
								Email
							</Label>
							<Input type="email" id="email" required />
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="password"
								className="text-sm font-medium"
							>
								Password
							</Label>
							<Input type="password" id="password" required />
						</div>
						<Button type="submit" className="w-full mt-4">
							Sign In
						</Button>
					</form>
				</CardContent>
			</Card>
		</main>
	);
}
