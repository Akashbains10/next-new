'use client'
import { SessionProvider } from "next-auth/react"
import ReactQueryProvider from "./ReactQueryProvider"

const PageSessionProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <ReactQueryProvider>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ReactQueryProvider>
    )
}

export default PageSessionProvider;