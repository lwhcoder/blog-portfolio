import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export default function XTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef(new FitAddon());
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize terminal
    terminal.current = new Terminal({
      cursorBlink: true,
      fontFamily: "monospace",
      fontSize: 14,
    });
    terminal.current.loadAddon(fitAddon.current);
    terminal.current.open(terminalRef.current);

    // Ensure terminal is resized after rendering
    setTimeout(() => {
      fitAddon.current.fit();
    }, 100);

    // Connect to external WebSocket server
    const wsUrl = "ws://localhost:3001";
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      terminal.current?.write("\r\n\x1b[1;32mConnected to SSH server\x1b[0m\r\n");
      fitAddon.current.fit();
    };

    wsRef.current.onmessage = (event) => {
      // Write incoming data to the terminal
      terminal.current?.write(event.data);
    };

    wsRef.current.onclose = () => {
      terminal.current?.write("\r\n\x1b[1;31mConnection closed\x1b[0m\r\n");
    };

    wsRef.current.onerror = () => {
      terminal.current?.write("\r\n\x1b[1;31mWebSocket error\x1b[0m\r\n");
    };

    terminal.current.onData((data) => {
      // Send terminal input to the WebSocket server
      wsRef.current?.send(data);
    });

    const handleResize = () => {
      if (terminal.current) {
        fitAddon.current.fit();
        const cols = terminal.current.cols;
        const rows = terminal.current.rows;
        wsRef.current?.send(JSON.stringify({ action: "resize", cols, rows }));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      wsRef.current?.close();
      terminal.current?.dispose();
    };
  }, []);

  return <div ref={terminalRef} className="h-full w-full bg-black" />;
}