# posts.json — Latest on LinkedIn

This file feeds the "Latest on LinkedIn" list under the Writing section
on the homepage. It is NOT wired to any automatic sync — nothing scrapes
LinkedIn, and there are no credentials anywhere in this project. Add rows
here by hand once a post is public and you have its exact URL, then
redeploy (e.g. push to the GitHub Pages repo for pranjaldesai.in).

## Format

posts.json is a JSON array. Each entry:

{
  "id": "2026-09-14-wars-companies",   // unique string, used to dedupe
  "date": "2026-09-14",                // YYYY-MM-DD, shown on the card
  "excerpt": "My relative said something at dinner that broke my brain.",
  "url": "https://www.linkedin.com/posts/pranjaldesai15_...",  // the exact post URL, never just the profile link
  "image": "assets/some-image.jpg"     // optional — omit the key entirely if there's no image
}

## Rules the site enforces

- A record with no "url" is skipped — every card must link to its own
  specific post, never just the profile.
- Records are deduplicated by "id". If two entries share an id, only the
  first one (in file order) renders.
- If the array is empty (as it is now, "[]"), the site shows a plain
  "No verified posts logged yet." line — it never fakes a list or claims
  a sync is running.
- Nothing here is invented. Only add a row once you have the real,
  public post URL in hand.

## Example with one real entry

[
  {
    "id": "2026-09-14-wars-companies",
    "date": "2026-09-14",
    "excerpt": "My relative said something at dinner that broke my brain.",
    "url": "https://www.linkedin.com/posts/pranjaldesai15_wars-arent-between-countries-activity-1234567890"
  }
]
