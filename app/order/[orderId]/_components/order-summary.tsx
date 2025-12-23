import { ItemsProductsOrder } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, CreditCard } from "lucide-react";

type OrderSummaryProps = {
	order: ItemsProductsOrder;
};

export default async function OrderSummary({ order }: OrderSummaryProps) {
	const getStatusDetails = (status: string) => {
		switch (status) {
			case "PAID":
				return {
					label: "Paid",
					variant: "default" as const,
					icon: <CheckCircle className="w-4 h-4" />,
				};
			case "PENDING":
				return {
					label: "Pending",
					variant: "secondary" as const,
					icon: <Clock className="w-4 h-4" />,
				};
			case "PENDING_PAYMENT":
				return {
					label: "Payment Pending",
					variant: "outline" as const,
					icon: <CreditCard className="w-4 h-4" />,
				};
			case "FAILED":
				return {
					label: "Failed",
					variant: "destructive" as const,
					icon: <AlertCircle className="w-4 h-4" />,
				};
			case "PAYMENT_PROCESSED":
				return {
					label: "Payment Processed",
					variant: "outline" as const,
					icon: <CreditCard className="w-4 h-4" />,
				};
			default:
				return {
					label: status,
					variant: "secondary" as const,
					icon: <Clock className="w-4 h-4" />,
				};
		}
	};

	const statusDetails = getStatusDetails(order.status);

	return (
		<div className="flex flex-col mt-2">
			<div className="text-sm text-muted-foreground">
				<div className="flex items-center justify-between py-1 my-1">
					<p>Subtotal:</p>
					<p className="text-base text-foreground">
						{formatPrice(order.totalAmount)}
					</p>
				</div>

				<div className="flex items-center justify-between py-1 my-1">
					<p>Taxes:</p>
					<p className="">{formatPrice(0)}</p>
				</div>

				<div className="flex items-center justify-between py-1 my-1">
					<p>Shipping:</p>
					<p className="">{formatPrice(0)}</p>
				</div>

				<div className="flex items-center justify-between py-1 my-1 border-b border-muted">
					<p>Order Status:</p>
					<p className="">
						<Badge
							variant={statusDetails.variant}
							className="flex items-center gap-1"
						>
							{statusDetails.icon}
							{statusDetails.label}
						</Badge>
					</p>
				</div>

				<div className="flex items-center justify-between py-1 my-1 font-semibold text-lg text-primary">
					<p>Total:</p>
					<p className="text-base text-foreground">
						{formatPrice(order.totalAmount)}
					</p>
				</div>
			</div>
		</div>
	);
}
