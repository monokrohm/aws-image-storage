"use client";

import { Button } from "./ui/button";
import { useState } from 'react';

export default function SearchBar() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        const tags = input.split(',').map(tag => tag.trim()).filter(tag => tag);

        if (tags.length > 0) {
            window.location.href = `/user/search?tags=${tags.join(',')}`;
        }

        setLoading(false);
    };

    return (
        <div className=" md:max-w-2xl">
            <div
                className="flex flex-1 items-center w-max mx-5 px-10 py-2   
            bg-white shadow-xl rounded-full border-0"
            >
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Separate tags with a comma(,)"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="placeholder:w-[1000px] outline-none"
                    />
                    <Button variant="ghost" type="submit" disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </Button>
                </form>
            </div>

        </div>
    );
}

