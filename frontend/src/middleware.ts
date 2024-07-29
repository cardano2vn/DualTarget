import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths: string[] = ["/admin/manager"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const cookieStore = cookies();
    const userWalletAddress = cookieStore.get("wallet_address")?.value;
    if (
        privatePaths.some((path) => pathname.startsWith(path)) &&
        userWalletAddress !== process.env.ADMIN_WALLET_ADDRESS
    ) {
        return NextResponse.next();
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
