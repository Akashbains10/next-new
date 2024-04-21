export default function DashboardLayout({
    children,
    users,
    notifications
}: {
    children: React.ReactNode,
    users: React.ReactNode,
    notifications: React.ReactNode
}) {
    return (
        <div>
            <h1>This is an layout of dashboard page</h1>
            {users}
            {notifications}
            <div>{children}</div>
        </div>
    )
}