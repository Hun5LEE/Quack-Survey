import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getFetch } from "./utils/fetch/core";

export async function middleware(request: NextRequest) {
  const username = request.cookies.get("username");
  const { pathname } = request.nextUrl;
  const email = request.nextUrl.searchParams.get("email");

  if (pathname === "/")
    return NextResponse.redirect(new URL("/home", request.url));

  if (pathname === "/dashboard")
    return NextResponse.redirect(new URL("/dashboard/status", request.url));

  if (pathname === "/verify" && !email) {
    return NextResponse.redirect(new URL("/home", request.url));
  } else if (pathname === "/verify" && email) {
    const { state, cert } = await getFetch(`/users/verify?email=${email}`);

    if (!state || (state && cert)) {
      return NextResponse.redirect(new URL("/home", request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (pathname.includes("/verify")) {
    const code = pathname.split("/")[2];
    const { state } = await getFetch(`/users/verify/${code}?checkState=true`);

    if (state) return NextResponse.next();
    else return NextResponse.redirect(new URL("/home", request.url));
  }

  if (pathname === "/password")
    return NextResponse.redirect(new URL("/home", request.url));

  if (pathname.includes("/password")) {
    const code = pathname.split("/")[2];
    const { state } = await getFetch(`/users/find/password/${code}`);

    if (state) return NextResponse.next();
    else return NextResponse.redirect(new URL("/home", request.url));
  }

  if (
    username &&
    (pathname === "/login" || pathname === "/signup" || pathname === "/verify")
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (
    !username &&
    !(pathname === "/login" || pathname === "/signup" || pathname === "/verify")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|images|respondent/*).*)",
  ],
};
