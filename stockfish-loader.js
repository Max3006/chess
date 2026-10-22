// Same-origin worker wrapper with CDN fallbacks for iOS Safari.
const STOCKFISH_URLS = [
  "https://cdn.jsdelivr.net/npm/stockfish@19.0.0/bin/stockfish-19-asm.js",
  "https://unpkg.com/stockfish@19.0.0/bin/stockfish-19-asm.js",
  "https://cdn.jsdelivr.net/npm/stockfish@19.0.1/bin/stockfish-19-asm.js",
  "https://unpkg.com/stockfish@19.0.1/bin/stockfish-19-asm.js"
];

const failures = [];
let loaded = false;

for (const url of STOCKFISH_URLS) {
  try {
    importScripts(url);
    loaded = true;
    postMessage("ENGINE_LOAD_OK:" + JSON.stringify({
      phase: "importScripts",
      url,
      worker: self.location && self.location.href ? self.location.href : "worker URL unavailable"
    }));
    break;
  } catch (error) {
    failures.push({
      url,
      name: error && error.name ? error.name : "Error",
      message: error && error.message ? error.message : String(error),
      stack: error && error.stack ? error.stack : ""
    });
  }
}

if (!loaded) {
  postMessage("ENGINE_LOAD_ERROR:" + JSON.stringify({
    phase: "importScripts",
    message: "All Stockfish CDN mirrors failed.",
    failures,
    worker: self.location && self.location.href ? self.location.href : "worker URL unavailable"
  }));
}
