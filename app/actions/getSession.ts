import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { deleteAppClientCache } from "next/dist/server/lib/render-server";

export default async function getSession() {
    return await getServerSession(authOptions);
}

