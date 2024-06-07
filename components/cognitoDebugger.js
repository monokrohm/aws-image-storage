import { getCurrentUser } from "aws-amplify/auth";

export default async function currentAuthenticatedUser() {
    try {
        const { username, userId, signInDetails } = await getCurrentUser();
        console.log(`The username: ${username}`);
    } catch (err) {
        console.log(err);
    }
}
