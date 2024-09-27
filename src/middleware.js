import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const token = cookies(request).get("__Secure-next-auth.session-token");
  const pathname = request.nextUrl.pathname;
  if (pathname.includes("api")) {
    return NextResponse.next();
  }
  if (!token) {
    return Response.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/my-bookings/:path*", "/services/:path*"],
};

// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export const middleware = async (request) => {
//   const token = cookies(request).get("next-auth.session-token");
//   const { pathname } = request.nextUrl;

//   // Allow API routes to proceed without any authentication check
//   if (pathname.includes("/api")) {
//     return NextResponse.next();
//   }

//   // If no token (user is not logged in)
//   if (!token) {
//     // Redirect to login page, keep the current pathname as redirect target
//     const loginUrl = new URL(
//       `/login?redirect=${encodeURIComponent(pathname)}`,
//       request.url
//     );
//     return NextResponse.redirect(loginUrl);
//   }

//   // Token exists (user is logged in)
//   // Here, we check if the requested pathname is a valid route
//   // If valid, proceed to the requested route
//   // If the requested route is not valid, redirect the user to home page
//   if (!pathname || pathname === "/") {
//     return NextResponse.redirect(new URL("/", request.url)); // Send user to home if no valid path
//   }

//   return NextResponse.next(); // Proceed to requested route
// };

// export const config = {
//   matcher: ["/my-bookings/:path*", "/services/:path*"], // Protect these routes
// };
