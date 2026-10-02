import { NextResponse } from "next/server";

export function middleware(request) {
  const hostname = request.headers.get("host")?.split(":")[0];

  // The KELTNER Vercel project shares this repository with the portfolio.
  // Keep the public KELTNER domain rooted at keltnerpress.com while the
  // portfolio domain continues to use the portfolio route group.
  if (
    (hostname === "keltnerpress.com" || hostname === "www.keltnerpress.com") &&
    request.nextUrl.pathname === "/"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/keltner";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
