// POST { companyName }
// Looks for credible evidence of the company's official web presence using
// the same Google Custom Search API as search-official-listing.js.
// Returns evidence links for the frontend to display — never asserts a
// company is fake just because nothing was found.

var lib = require("./_lib");
