import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserRoleFromToken } from "@repo/ui/utils/auth";
import {
  roleRoutes,
  authRoutes,
  defaultRedirect,
} from "@repo/ui/constants/routes";

function getRequiredRoleForPath(pathname: string): string | null {
  for (const [role, routes] of Object.entries(roleRoutes)) {
    if (routes.includes(pathname)) {
      return role;
    }
  }
  return null;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;
  const userRole = getUserRoleFromToken(token);
  const isAuthRoute = authRoutes.includes(pathname);

  const requiredRole = getRequiredRoleForPath(pathname);
  const isProtectedRoute = requiredRole !== null;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuthRoute && token && userRole && defaultRedirect[userRole]) {
    return NextResponse.redirect(
      new URL(defaultRedirect[userRole], request.url)
    );
  }

  if (isProtectedRoute && token && (!userRole || requiredRole !== userRole)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
