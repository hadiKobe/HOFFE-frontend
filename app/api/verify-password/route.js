export async function POST(req) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASS) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ ok: false }), { status: 401 });
}
