import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/dist/client/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Next-Commerce",
	description: "A simple e-commerce app built with Next.js and Prisma",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<>
						<header>
							<Navbar />
						</header>
						{children}
						<footer className="border-t border-dashed border-border mt-8">
							<div className="container mx-auto p-4 text-center text-sm text-muted-foreground">
								&copy; {new Date().getFullYear()} Next-Commerce.
								All rights reserved.
							</div>
						</footer>
					</>
				</ThemeProvider>
			</body>
		</html>
	);
}
