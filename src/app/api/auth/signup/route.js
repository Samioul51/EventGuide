import { auth } from "../../../lib/firebase.init";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export async function POST(req) {
    try {
        const { name, email, password, photoURL } = await req.json();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name, photoURL });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
}
