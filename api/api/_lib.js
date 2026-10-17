// Shared helpers for GatekeepeRShield's serverless API functions.
// No external dependencies — uses only Node's built-ins + global fetch
// (available on Vercel's Node 18+ runtime).

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
