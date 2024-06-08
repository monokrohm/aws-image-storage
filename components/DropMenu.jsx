"use client";

import Image from "next/image";
import "../lib/amplifyClientUtils";
import { useRouter } from "next/navigation";
import currentAuthenticatedUser from "../lib/cognitoFunctions";
import { signOut } from "aws-amplify/auth";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropMenu() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            window.location.href = "/auth/login";
        } catch (error) {
            console.log("error signing out: ", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Image
                    src="/images/avatar.png"
                    alt="USER"
                    height={50}
                    width={50}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>User</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        window.location.href = "/user/dashboard";
                    }}
                >
                    Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/auth/login")}>
                    Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/auth/register")}>
                    Register
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSignOut()}>
                    Sign Out
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => currentAuthenticatedUser()}>
                    Session Debugger
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
