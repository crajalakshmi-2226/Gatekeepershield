// POST { companyName, jobTitle, location }
// Searches for a matching official job listing using Google's free-tier
// Custom Search JSON API (100 queries/day free). Requires two environment
// variables to be set in the Vercel project:
//   GOOGLE_SEARCH_API_KEY  — API key from Google Cloud Console
//   GOOGLE_SEARCH_CX       — Search Engine ID from programmablesearchengine.google.com
// If those aren't set, this returns status:"not_configured" instead of
// pretending the check succeeded — never fabricate a verification result.
