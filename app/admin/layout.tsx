import AdminLayout from "@/components/Sidebar/Layout"
import React from "react"

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    )
}