export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.substring(1);

    const object = await env.R2_BUCKET.get(key);
    if (!object) {
      return new Response("File not found", { status: 404 });
    }

    return new Response(object.body, {
      headers: {
        "Content-Type": "video/mp4",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  },
};
