export default {
  async fetch(request, env, ctx) {
    // The static site is served by Cloudflare Pages automatically
    // This worker can be used for additional functionality

    // Example: Add security headers
    const response = await env.ASSETS.fetch(request)
    const newResponse = new Response(response.body, response)

    // Add security headers
    newResponse.headers.set("X-Content-Type-Options", "nosniff")
    newResponse.headers.set("X-Frame-Options", "DENY")
    newResponse.headers.set("X-XSS-Protection", "1; mode=block")
    newResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    newResponse.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

    return newResponse
  },
}
