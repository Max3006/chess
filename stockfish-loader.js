// Same-origin worker wrapper for the Stockfish JavaScript fallback.
const STOCKFISH_URL = "https://cdn.jsdelivr.net/npm/stockfish@19.0.0/bin/stockfish-19-asm.js";
try {
  importScripts(STOCKFISH_URL);
} catch (error) {
  postMessage("ENGINE_LOAD_ERROR:" + JSON.stringify({
    phase: "importScripts",
    name: error && error.name ? error.name : "Error",
    message: error && error.message ? error.message : String(error),
    stack: error && error.stack ? error.stack : "",
    url: STOCKFISH_URL,
    worker: self.location && self.location.href ? self.location.href : "worker URL unavailable"
  }));
}