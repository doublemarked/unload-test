export type EventRow = {
  source: "manual" | "beacon" | "fetch";
  type: string;
  instance: string;
  timestamp: string;
};

// GET "/events"
export async function GET() {
    const kv = await Deno.openKv();

    const entry = await kv.get(["events"]);
    const events = entry?.value ?? [];

  return Response.json(events);
}

// POST "/events"
export async function POST(req: Request) {
    const events: EventRow[] = [];
    const { source, type, instance } = await req.json();
    
    const event: EventRow = {
      source,
      type,
      instance,
      timestamp: new Date().toISOString(),
    };

    const kv = await Deno.openKv();

    async function addEvent() {
        const entry = await kv.get(["events"]);
        
        events.length = 0;
        events.push(event, ...(entry?.value as EventRow[] ?? []));

        if (events.length > 50) {
            events.length = 50;
        }

        // await kv.set(["events"], events);
        return kv.atomic()
        .check({ key: entry.key, versionstamp: entry.versionstamp })
        .set(entry.key, events)
        .commit();
    }

    const { ok } = await addEvent();
    
    if (!ok) {
        // retry once in case of collision
        const res = await addEvent();
        if (!res.ok) {
            console.log('Failed KV response:', JSON.stringify(res));
            return new Response('failed to push event', { status: 500 });
        }
    }
    
  return Response.json(events);
}

// DELETE "/events"
export async function DELETE() {
    const kv = await Deno.openKv();
    await kv.set(["events"], []);

  return new Response('ok');
}
