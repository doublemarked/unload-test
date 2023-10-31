import { format } from "https://deno.land/std/datetime/mod.ts";
import { Head, Link } from "aleph/react";
import { useState, useEffect, useCallback } from "react";

import type { EventRow } from "./events/index.ts";

const shortdate = (ds: string) => format(new Date(ds), "yyyy-MM-dd HH:mm:ss")

const mkid = () => Math.random().toString(36).slice(2, 7);

export default function Index() {
  const [instanceId, setInstanceId] = useState<string>();
  const [events, setEvents] = useState<EventRow[]>([]);

  async function fetchEvents() {
    const res = await fetch("/events");
    setEvents(await res.json());
  }

  const resetInstanceId = useCallback(() => {
    const id = mkid();
    setInstanceId(id);
    // window.history.replaceState({}, "", `?instanceId=${id}`);
  }, [setInstanceId]);

  useEffect(() => {
    fetchEvents();
    setInstanceId(mkid());
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("instanceId");
    if (id) {
      setInstanceId(id);
    } else {
      resetInstanceId();
    }
  }, [setInstanceId, setEvents]);

  const sendBeacon = (source: string) => {
    navigator.sendBeacon(
      "/events",
      JSON.stringify({
        instance: instanceId,
        type: "beacon",
        source,
      })
    );
  };

  const sendFetch = (source: string) => 
    fetch("/events", {
      method: 'POST',
      // Not supported by Firefox
      keepalive: true,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instance: instanceId,
        type: "fetch",
        source,
      }),
    });

  const clearEvents = useCallback(() => {
    fetch("/events", { method: "DELETE" }).then(() => fetchEvents());
  }, [setEvents]);

  const sendManualBeacon = useCallback(() => {
    sendBeacon('manual');

    // Delay a bit since Beacon is fully async
    setTimeout(fetchEvents, 500);
  }, [instanceId, setEvents]);

  const sendManualFetch = useCallback(() => {
    sendFetch('manual').then(() => fetchEvents());
  }, [instanceId, setEvents]);

  useEffect(() => {
    const handleUnload = () => {
      sendBeacon('unload');
      sendFetch('unload');
    };
    self.addEventListener("unload", handleUnload);
    return () => self.removeEventListener("unload", handleUnload);
  }, [instanceId]);

  return (
    <div className="screen index">
      <Head>
        <title>Unload Event Tests</title>
      </Head>
      <main>
        <h1>Unload Event Tests</h1>
        <p>
          This small app sends Beacon and keepalive fetch POST calls to its
          persistent backend when the page is unloaded.
        </p>
        <div>
          Your Instance ID: <span className="instance-id">{instanceId}</span>
          <button onClick={() => resetInstanceId()}>Reset</button>
        </div>
        <div>
          <button onClick={() => sendManualBeacon()}>Send Manual Beacon</button>
          <button onClick={() => sendManualFetch()}>Send Manual Keepalive Fetch</button>
        </div>
        <br />
        <h3>Event Log 
          <button onClick={() => clearEvents()}>Clear</button>
          </h3>
        <div className="events">
          {events.map((e) => (
            <div key={e.timestamp}>
              <span className="instance-id">{e.instance}</span> @{" "}
              <span className="timestamp">{shortdate(e.timestamp)}</span>:
              &nbsp;&nbsp;&nbsp;
              {e.source} {e.type}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
