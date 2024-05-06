import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "../Image/Image";
import ImageView from "../Image/Image";
import { ClassNames } from "@emotion/react";

export default function Header() {
    const router = useRouter();
    const { data } = useSession();
    console.log(data, 'session header')
    return (
        <Navbar className="bg-slate-200	">
            <NavbarBrand>
                {/* <AcmeLogo /> */}
                <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {!data?.user ?
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link href="/auth/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button color="primary" variant="flat" onClick={() => router.push('/auth/register')}>
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                    :
                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                >
                                    <span><i className="fa-solid fa-circle-user text-lg"></i></span>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new"
                                    startContent={<ImageView src="https:fouad.vipankumar.in" />}>
                                    {data?.user?.name}
                                </DropdownItem>
                                <DropdownItem key="copy" className="text-danger">
                                    <button onClick={()=> signOut()}>Logout</button>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                }
            </NavbarContent>
        </Navbar>
    )
}