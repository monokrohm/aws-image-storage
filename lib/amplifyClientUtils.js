"use client";

import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";

Amplify.configure(config, {
    ssr: true, // required when using Amplify with Next.js
});

export default function RootLayoutThatConfiguresAmplifyOnTheClient({
    children,
}) {
    return children;
}
