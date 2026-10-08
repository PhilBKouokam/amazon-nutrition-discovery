# Amazon nutrition discovery

An independent exploratory frontend and product-design prototype for regular Amazon retail search. It does not represent Amazon employment, official collaboration, an endorsement, or shipped retailer functionality.

[Live walkthrough](https://amazon-nutrition-discovery.kouokambryan.chatgpt.site) · Source baseline: Site version 7, commit `65b069efd067c28a26ebea359d3ccc6f76a3b832`.

The source package retains the interaction model and nutrition fixtures. Original product photos, label downloads and BEFORE screenshots are omitted; referenced image slots use labeled SVG placeholders. The local preview therefore cannot substitute for the original visual evidence. See [media attribution and rights](MEDIA-RIGHTS.md), [omitted media sources](MEDIA-SOURCES.json), and [source provenance](SOURCE-PROVENANCE.md).

## Observe → Proposed → Result

Direct entry opens the protein story at Observe. Calories, Protein and Fiber tabs select distinct three-step walkthroughs via `?story=calories`, `?story=protein`, or `?story=fiber`. Observe describes bounded recorded desktop/phone evidence. Proposed puts an exact numeric goal beside the shopping results; Result keeps that control and the matching list together on the same screen. Restart and step navigation support repeat exploration.

| Story | Fixtures | Initial goal | A tighter example |
| --- | --- | --- | --- |
| Calories | Four individual-serving popcorns | ≤150 kcal: four matches | ≤100 kcal: three matches |
| Protein | Four protein bars | ≥10 g: four matches | ≥20 g: three matches |
| Fiber | Four bars/brownies | ≥6 g: four matches | ≥9 g: one match |

## Implemented behavior

Editable numeric goals, optional additional AND goals, applied goal chips, brand filtering, clear/reset, empty-result recovery, and missing/conflicting-data scenarios are implemented. Search matching is implemented in the underlying logic; the current walkthrough hides the global search form and uses a fixed query for each story. Validation accepts zero and decimal grams, rejects negative/nonfinite/empty values, and requires whole-number calories. Unknown or conflicting required values cannot meet a goal, including zero. Each row leads with the selected nutrient under the description and exposes serving context in the right column. Source-facts dialogs and a two-product comparison retain label basis, with an explicit equal-weight comparison where offered. Source-linked rating snapshots include variant and freshness notes; a missing snapshot is labeled unavailable.

This proposal builds on existing retailer capabilities. It does not claim that Amazon lacks nutrition facts, filters or comparison features. Amazon Now and Whole Foods/Fresh modules are outside scope. No real shopping, cart, checkout, prices, live stock or delivery promise is implemented.

## Stack and local run

Buildless HTML, CSS, browser ES modules and JSON fixtures. Vanilla JavaScript renders and filters the local catalog. Node's built-in test runner checks pure matching and validation logic. No framework, external npm dependencies, production backend, database, retailer API, account access or analytics is present.

```sh
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000/`; use the story tabs for the other routes. Serve over HTTP because the app fetches `fixtures.json` and imports ES modules. Node.js 20+ runs the existing tests without an install step:

```sh
npm test
```

## Data and source dates

`dist/fixtures.json` records 12 source-grounded products, observed 7 October 2026, with exact serving amounts, Amazon product links, package-label image links, manufacturer corroboration where available, warnings and source notes. Rating records were checked 8 October 2026 and retain crawler age; counts are listing ratings, not verified written reviews or flavor-exclusive counts. Eleven fixtures have rating snapshots; the kettle-corn example has no verified rating record.

Serving sizes vary: a bag/bar is a serving, not the entire multipack. Exact pack/market/formulation conflicts are disclosed rather than silently combined. One fiber fixture records a prior unavailable listing without asserting current availability. Fixtures are historical snapshots; no nutrition, price, rating or inventory source was refreshed during export.

## Validation and limits

On 8 October 2026 the original runtime tree matched the selected Sites commit, and the corresponding production deployment returned `succeeded`. All six existing Node tests passed on this export: fixture/default counts, inclusive boundaries and AND logic, required-value conflicts, malformed/missing values, draft validation, and search/brand independence. Static asset/link checks, source-change review, and a secret/privacy scan were also performed.

Chrome smoke checks used local iframe viewports of 390 and 1200 CSS pixels wide, each 1000 pixels tall. All three stories opened at Observe and advanced to Proposed. Applying the tighter goals in the table returned 3, 3 and 1 products respectively at both widths; the goal control and product results were visible together. Scoped DOM geometry showed no horizontal document overflow, and loaded visible placeholder images had no load failures. An additional desktop protein check exercised negative-input rejection, an empty result and reset, a source-facts dialog and two-product comparison. These are bounded responsive-CSS and interaction checks, not physical-phone, touch, screenshot-fidelity or assistive-technology tests.

No customer testing, adoption, revenue or conversion lift, live catalog coverage, native-app parity, universal accessibility or assistive-technology certification is claimed. Historical screenshot scope does not establish today's retailer UI. Label verification dates and device limitations remain visible. This is an independent source export for review. No code or third-party media license is granted by this package.
