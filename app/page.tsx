'use client'

import Header from "@/components/Header/Header"
import { SidebarComponent } from "@/components/Sidebar/SidebarComponent"
import { Spinner } from "@nextui-org/react"
import { Suspense } from "react"

export default function Home() {
    return (
        <div>
            <Header />
            {/* <SidebarComponent/> */}
        </div>
    )
}