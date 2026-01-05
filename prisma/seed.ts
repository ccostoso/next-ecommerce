import "dotenv/config";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

async function main() {
	// Delete in reverse dependency order (children before parents)
	await prisma.cartItem.deleteMany();
	await prisma.orderItem.deleteMany();
	await prisma.cart.deleteMany();
	await prisma.order.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();
	await prisma.user.deleteMany();
	await prisma.userRole.deleteMany();

	const electronics = await prisma.category.create({
		data: {
			name: "Electronics",
			slug: "electronics",
		},
	});

	const clothing = await prisma.category.create({
		data: {
			name: "Clothing",
			slug: "clothing",
		},
	});

	const home = await prisma.category.create({
		data: {
			name: "Home",
			slug: "home",
		},
	});

	const products: Prisma.ProductCreateInput[] = [
		{
			name: "Wireless Headphones",
			description:
				"Premium noise-cancelling wireless headphones with long battery life.",
			price: 199.99,
			image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
			category: {
				connect: { id: electronics.id },
			},
			slug: "wireless-headphones",
			inventory: 50,
		},
		{
			name: "Smart Watch",
			description:
				"Fitness tracker with heart rate monitoring and sleep analysis.",
			price: 149.99,
			image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
			category: {
				connect: { id: electronics.id },
			},
			slug: "smart-watch",
			inventory: 30,
		},
		{
			name: "Running Shoes",
			description:
				"Lightweight running shoes with responsive cushioning.",
			price: 89.99,
			image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
			category: {
				connect: { id: clothing.id },
			},
			slug: "running-shoes",
			inventory: 100,
		},
		{
			name: "Ceramic Mug",
			description: "Handcrafted ceramic mug with minimalist design.",
			price: 24.99,
			image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
			category: {
				connect: { id: home.id },
			},
			slug: "ceramic-mug",
			inventory: 0,
		},
		{
			name: "Leather Backpack",
			description: "Durable leather backpack with multiple compartments.",
			price: 79.99,
			image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
			category: {
				connect: { id: clothing.id },
			},
			slug: "leather-backpack",
			inventory: 75,
		},
	];

	for (const product of products) {
		await prisma.product.create({
			data: product,
		});
	}

	// Create user roles first
	const adminRole = await prisma.userRole.create({
		data: { name: "ADMIN" },
	});

	const userRole = await prisma.userRole.create({
		data: { name: "USER" },
	});

	// Now create users using the role IDs
	const users: Prisma.UserCreateInput[] = [
		{
			email: "admin@example.com",
			password: "adminpassword",
			name: "Admin User",
			userRole: {
				connect: { id: adminRole.id },
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			email: "user@example.com",
			password: "userpassword",
			name: "Regular User",
			userRole: {
				connect: { id: userRole.id },
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

	for (const user of users) {
		const hashedPassword = await hashPassword(user.password);
		await prisma.user.create({
			data: {
				...user,
				password: hashedPassword,
			},
		});
	}

	console.log("Users seeded successfully.");
}

main()
	.then(async () => {
		console.log("Seeding complete!");
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
