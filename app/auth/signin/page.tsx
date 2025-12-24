"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SigninSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema } from "@/lib/schemas";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";

export default function SignInPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SigninSchemaType>({
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
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Welcome Back</CardTitle>
					<CardDescription>
						Sign in to your account to continue.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className="w-full max-w-md"
						onSubmit={handleSubmit(onSubmit)}
					>
						<FieldGroup className="gap-5">
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									type="email"
									id="email"
									{...register("email")}
									aria-invalid={!!errors.email}
									placeholder="Email"
								/>
								{errors.email && (
									<FieldDescription className="text-destructive text-sm">
										{errors.email.message}
									</FieldDescription>
								)}
							</Field>

							<Field>
								<FieldLabel htmlFor="password">
									Password
								</FieldLabel>
								<Input
									type="password"
									id="password"
									{...register("password")}
									aria-invalid={!!errors.password}
									placeholder="Password"
								/>
								{errors.password && (
									<FieldDescription className="text-destructive text-sm">
										{errors.password.message}
									</FieldDescription>
								)}
							</Field>

							<Button
								type="submit"
								className="w-full mt-2 bg-green-600 hover:bg-green-700 hover:shadow-lg transition-shadow text-white"
							>
								Sign In
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
				<CardFooter>
					<p className="text-sm text-muted-foreground">
						Don't have an account?{" "}
						<Link
							href="/auth/signup"
							className="font-medium text-primary hover:underline"
						>
							Register here
						</Link>
						.
					</p>
				</CardFooter>
			</Card>
		</main>
	);
}
