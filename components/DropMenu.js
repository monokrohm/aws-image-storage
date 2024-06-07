"use client";

import Image from "next/image";
import { signOut } from "aws-amplify/auth";
import "../lib/amplifyClientUtils";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import currentAuthenticatedUser from "./cognitoDebugger";

export default function DropMenu() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/auth/login");
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
                    height={100}
                    width={100}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>User</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => router.push("/user/dashboard")}
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
