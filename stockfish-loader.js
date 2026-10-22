// Same-origin worker wrapper for the Stockfish JavaScript fallback.
try {
  importScripts("https://cdn.jsdelivr.net/npm/stockfish@19.0.0/bin/stockfish-19-asm.js");
} catch (error) {
  postMessage("ENGINE_LOAD_ERROR:" + (error && error.message ? error.message : String(error)));
}
