/* eslint-disable prefer-const */
import { NextResponse } from "next/server";
import { Client } from "ssh2";
import { type ConnectConfig } from "ssh2";

// Simple in-memory connection store for local testing
const activeConnections: Record<string, Client> = {};

// SSH Configuration for local mode
const SSH_CONFIG: ConnectConfig = {
  host: "192.168.1.158", // local server IP
  port: 22,
  username: process.env.SSH_USER || "ahmedcode",
  password: process.env.SSH_PASSWORD || "ahmedthemckid",
  readyTimeout: 5000,
  debug: (msg) => console.log("[SSH Debug]", msg)
};

export async function POST(request: Request) {
  const { action, command, mode, connectionId } = await request.json();

  try {
    if (action === "local") {
      return await connectLocal();
    }
    if (action === "command") {
      return await runCommand(connectionId, command);
    }
    if (action === "disconnect") {
      return await disconnect(connectionId);
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("SSH Error:", error);
    return NextResponse.json(
      {
        error: "Connection failed",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

async function connectLocal(): Promise<NextResponse> {
  return new Promise((resolve) => {
    const conn = new Client();
    const connectionId = Date.now().toString();

    conn
      .on("ready", () => {
        console.log(`[SSH] Local connection ready (${connectionId})`);
        activeConnections[connectionId] = conn;
        resolve(
          NextResponse.json({
            success: true,
            message: "Local SSH connection established",
            connectionId
          })
        );
      })
      .on("error", (err) => {
        console.error("[SSH Error]", err);
        resolve(
          NextResponse.json(
            { error: "SSH connection failed", details: err.message },
            { status: 500 }
          )
        );
      });

    conn.connect(SSH_CONFIG);
  });
}

async function runCommand(connectionId: string, command: string): Promise<NextResponse> {
  const conn = activeConnections[connectionId];
  if (!conn) {
    return NextResponse.json({ error: "No active connection" }, { status: 400 });
  }

  return new Promise((resolve) => {
    conn.exec(command, (err, stream) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: err.message }, { status: 500 })
        );
      }

      let output = "";
      stream
        .on("data", (data: Buffer) => {
          output += data.toString();
        })
        .stderr.on("data", (data: Buffer) => {
          output += data.toString();
        })
        .on("close", () => {
          resolve(NextResponse.json({ output }));
        });
    });
  });
}

async function disconnect(connectionId: string): Promise<NextResponse> {
  const conn = activeConnections[connectionId];
  if (conn) {
    conn.end();
    delete activeConnections[connectionId];
  }
  return NextResponse.json({ success: true, message: "Disconnected" });
}
