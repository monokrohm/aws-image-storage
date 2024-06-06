"use client";

import { Button } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import React from "react";

function SearchBar() {
    const [input, setInput] = React.useState("");
    const router = useRouter();

    return (
        <div className="w-full md:max-w-2xl">
            <div
                className="flex flex-1 items-center px-6 py-4 space-x-2  
            bg-white shadow-xl rounded-full border-0"
            >
                <form>
                    <input
                        type="text"
                        placeholder="Search for images..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="outline-none"
                    />
                    <Button type="submit">Search</Button>
                </form>
            </div>
        </div>
    );
}

export default SearchBar;
