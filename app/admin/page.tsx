import { getServerAuthSession } from "@/server/auth";

export default async function Admin() {
    const session = await getServerAuthSession();
    return <h3>Welcome {session?.user?.name} in Admin panel</h3>
}