// POST { query }
// Verifies whether a mentioned location/address is a real, mappable place
// using OpenStreetMap's free Nominatim API. Moved server-side (rather than
// calling Nominatim directly from the browser) so a proper identifying
// User-Agent header can be sent, per Nominatim's usage policy — browsers
// don't allow scripts to set that header themselves.

var lib = require("./_lib");

module.exports = async function handler(req, res) {
  lib.setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return lib.sendJSON(res, 405, { status: "error", message: "Method not allowed" });
  }

  var clientKey = lib.getClientKey(req);
  if (!lib.rateLimit("geocode:" + clientKey, 30)) {
    return lib.sendJSON(res, 429, { status: "rate_limited", message: "Too many requests — please wait a moment and try again." });
  }

  var body = await lib.readJsonBody(req);
  var query = (body.query || "").toString().trim().slice(0, 150);
  if (!query) {
    return lib.sendJSON(res, 200, { status: "insufficient_info" });
  }

  try {
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 7000);
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=" + encodeURIComponent(query);
    var resp = await fetch(url, {
      signal: controller.signal,
      headers: {
        "Accept": "application/json",
        "User-Agent": "GatekeepeRShield-VerificationBot/1.0 (+https://gatekeepershield.vercel.app)"
      }
    });
    clearTimeout(timeout);

    if (!resp.ok) return lib.sendJSON(res, 200, { status: "error" });
    var data = await resp.json();
    if (Array.isArray(data) && data.length > 0) {
      return lib.sendJSON(res, 200, { status: "verified", displayName: data[0].display_name, lat: data[0].lat, lon: data[0].lon });
    }
    return lib.sendJSON(res, 200, { status: "not_found" });
  } catch (e) {
    return lib.sendJSON(res, 200, { status: "error" });
  }
};
