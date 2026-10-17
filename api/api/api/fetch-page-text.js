// POST { url }
// Server-side fetches a given URL (used for the official-listing link found
// by search-official-listing.js) and returns cleaned, truncated text content.
// This exists because browsers can't fetch arbitrary third-party pages
// client-side (CORS) — so the vacancy-status and advertisement-comparison
// checks run here instead.

var lib = require("./_lib");
