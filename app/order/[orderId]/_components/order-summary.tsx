import { ItemsProductsOrder } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type OrderSummaryProps = {
	order: ItemsProductsOrder;
};

type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

const StatusBadge = ({ status }: { status: string }) => {
	const statusMap: Record<string, string> = {
		PAID: "Paid",
		PENDING_PAYMENT: "Pending Payment",
		PENDING: "Pending",
		FAILED: "Failed",
	};

	const statusVariantMap: Record<string, BadgeVariant> = {
		PAID: "default",
		PENDING_PAYMENT: "secondary",
		PENDING: "outline",
		FAILED: "destructive",
	};

	const variant: BadgeVariant = statusVariantMap[status] ?? "default";

	return <Badge variant={variant}>{statusMap[status]}</Badge>;
};

export default async function OrderSummary({ order }: OrderSummaryProps) {
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
						<StatusBadge status={order.status} />
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
