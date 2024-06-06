import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt");

  if (
    !jwt &&
    !request.nextUrl.pathname.startsWith("/entrar") &&
    !request.nextUrl.pathname.startsWith("/registrar")
  ) {
    return Response.redirect(new URL("/entrar", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
