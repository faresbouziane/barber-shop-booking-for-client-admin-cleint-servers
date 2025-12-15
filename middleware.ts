import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are public
const isPublicRoute = createRouteMatcher([
  "/book(.*)", 
  "/api/uploadthing(.*)", 
  "/sign-in(.*)", 
  "/sign-up(.*)"
]);

// CHANGED: Added 'async' keyword here
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    // CHANGED: Added 'await' and removed parentheses '()'
    await auth.protect(); 
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};