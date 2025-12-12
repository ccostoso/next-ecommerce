import { Fragment } from "react";
import { Home } from "lucide-react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";

export type BreadcrumbsItem = {
	label: string;
	href?: string;
	active?: boolean;
};

type BreadcrumbsProps = {
	items: BreadcrumbsItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<Breadcrumb className="mb-4">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">
						<Home className="h-4 w-4" />
					</BreadcrumbLink>
				</BreadcrumbItem>

				{items.map((item, index) => (
					<Fragment key={index}>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink
								href={item.href}
								className={
									item.active ? "font-semibold active" : ""
								}
								aria-current={item.active ? "page" : undefined}
							>
								{item.label}
							</BreadcrumbLink>
						</BreadcrumbItem>
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
