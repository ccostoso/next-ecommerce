import { prisma } from "../lib/prisma";

async function main() {
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();

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
