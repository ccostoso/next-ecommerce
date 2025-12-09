import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatPrice = (price: number): string => {
	return Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
};

export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
