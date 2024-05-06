import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export default function NextBreadCrumb({
    options
}: {
    options?: { label: string, to: string }[]
}) {
    return (
        <Breadcrumbs>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            {options?.map(({ label, to }) => (
                <BreadcrumbItem href={to}>{label}</BreadcrumbItem>
            ))}
        </Breadcrumbs>
    )
}