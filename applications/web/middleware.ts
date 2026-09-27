import createMiddleware from "next-intl/middleware";
import { routing } from "@/src/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

const authRoutes = ["/login", "/register"];
const protectedRoutes = [
  "/profile",
  "/dashboard",
  "/forecast",
  "/recommendations",
  "/appliances",
  "/footprint",
  "/tracker",
  "/schedule",
  "/ecky",
  "/price-history",
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("UserToken")?.value;

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  const hasLocale = routing.locales.includes(firstSegment as any);
  const currentLocale = hasLocale ? firstSegment : routing.defaultLocale;
  const cleanPath = hasLocale ? "/" + segments.slice(1).join("/") : pathname;

  const isAuthRoute = authRoutes.some(
    (route) => cleanPath === route || cleanPath.startsWith(route + "/"),
  );
  const isProtectedRoute = protectedRoutes.some(
    (route) => cleanPath === route || cleanPath.startsWith(route + "/"),
  );

  if (token && isAuthRoute) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/profile`, request.url),
    );
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}/login`, request.url),
    );
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
