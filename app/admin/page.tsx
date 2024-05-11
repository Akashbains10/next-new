import { getServerAuthSession } from "@/server/auth";

export default async function Admin() {
    const session = await getServerAuthSession();
    const {user}: any= session;
    return <h3>Welcome {user?.name} in Admin panel</h3>
}