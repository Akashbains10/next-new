export default function CommonBrandLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="shadow-md bg-slate-50 px-16 py-8 h-screen">
            {children}
        </div>
    )
}