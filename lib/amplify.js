import { Amplify } from "aws-amplify";
import awsExports from "../amplifyCognitoConfig";

// console.log("AWS Exports:", awsExports);

try {
    Amplify.configure(awsExports);
    console.log("Amplify configured successfully");
} catch (error) {
    console.error("Error configuring Amplify:", error);
}
