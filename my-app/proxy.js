import { NextResponse } from "next/server";
import { domainRoute } from "./src/keltner/urls.mjs";

export function proxy(request) {
  const hostname = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const route = domainRoute(hostname, request.nextUrl.pathname);
  if (!route) return NextResponse.next();
  const url = route.type === "redirect" ? new URL(route.destination) : request.nextUrl.clone();
  if (route.type === "rewrite") url.pathname = route.destination;
  url.search = request.nextUrl.search;
  return route.type === "redirect" ? NextResponse.redirect(url, 308) : NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
