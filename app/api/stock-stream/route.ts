export const dynamic = 'force-dynamic';

export async function GET() {
  const encoder = new TextEncoder();
  let timer: ReturnType<typeof setInterval>;
  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        const productId = 1 + Math.floor(Math.random() * 30);
        const event = { productId, sold: 1 + Math.floor(Math.random() * 3), city: ['Zagreb', 'Berlin', 'Lisbon', 'Oslo', 'Austin'][productId % 5], at: Date.now() };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };
      send();
      timer = setInterval(send, 4000);
    },
    cancel() {
      clearInterval(timer);
    },
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' } });
}
