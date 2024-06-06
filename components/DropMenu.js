"use client";

import { currentSession } from "@/lib/cognitoHandler";
import { Flex, Menu, MenuItem, MenuButton } from "@aws-amplify/ui-react";
import { signOut } from "aws-amplify/auth";
import "../lib/amplify";
import { useRouter } from "next/navigation";
import Avatar from "react-avatar";

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
        <Flex direction="column" width="4rem">
            <Menu
                trigger={
                    <MenuButton>
                        <Avatar name="G" round size="50" />
                    </MenuButton>
                }
            >
                <MenuItem onClick={() => router.push("/auth/login")}>
                    Login
                </MenuItem>
                <MenuItem onClick={() => router.push("/auth/register")}>
                    Register
                </MenuItem>
                <MenuItem onClick={() => handleSignOut()}>Sign Out</MenuItem>
            </Menu>
        </Flex>
    );
}

// router.push("/auth/register")
