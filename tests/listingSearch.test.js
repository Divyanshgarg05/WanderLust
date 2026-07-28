const test = require("node:test");
const assert = require("node:assert/strict");
const { buildListingFilter } = require("../controllers/listings.js");

test("builds a case-insensitive search filter for listing text fields", () => {
  const filter = buildListingFilter({ type: "rooms", search: "Paris" });

  assert.deepEqual(filter, {
    type: "rooms",
    $or: [
      { title: { $regex: "Paris", $options: "i" } },
      { location: { $regex: "Paris", $options: "i" } },
      { country: { $regex: "Paris", $options: "i" } },
      { description: { $regex: "Paris", $options: "i" } },
    ],
  });
});

test("ignores blank search values and keeps type-only filters", () => {
  const filter = buildListingFilter({ type: "all", search: "   " });

  assert.deepEqual(filter, {});
});
