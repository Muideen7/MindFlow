import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Or wherever your options are

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
