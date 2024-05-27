import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("usuario")?.value;

  if (
    !currentUser &&
    !request.nextUrl.pathname.startsWith("/entrar") &&
    !request.nextUrl.pathname.startsWith("/registrar")
  ) {
    return Response.redirect(new URL("/entrar", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
