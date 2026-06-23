# Welcome to the Adyen API

A single REST API for accepting payments anywhere your customers are. Process card, wallet, and 100+ local payment methods across 200+ markets, manage merchants and terminals, and reconcile activity through one integration.

## Pick Your Path

| If you're … | Start here |
|---|---|
| **Building an integration today** | [Make Your First API Call](#get-started) — test key, sandbox payment, and first `Authorised` response in five steps. |
| **Mapping the API to your business** | Skim [Why Adyen](#why-adyen) and [What You Can Build](#what-you-can-build) below, then jump into [Payment Use Cases](page:guides/payment-use-cases). |

---

## Why Adyen

Architectural choices that distinguish Adyen from other payments platforms — surfaced here because they affect your integration shape, not just our marketing.

<CardGroup cols={2}>
  <Card title="One API for every payment type" icon="CreditCard" url="page:guides/payment-use-cases">
    A single `POST /payments` call handles cards, wallets, BNPL, and 100+ local methods — the `paymentMethod.type` discriminator selects the rail. No separate endpoint per scheme, no separate SDK per region.
  </Card>
  <Card title="Hosted, drop-in, or fully custom" icon="Layers" url="page:guides/onboarding-journey">
    `createCheckoutSession` gives you a hosted checkout in one call. Components and Drop-in cover the middle ground. The raw `/payments` endpoint lets you own every pixel. Same auth, same response shape across all three.
  </Card>
  <Card title="Three-layer account model" icon="Building2" url="page:guides/make-payments-with-adyen-api">
    Company → merchant → terminal. Manage platforms, sub-merchants, and physical devices with endpoint groups scoped to the layer you care about — without leaking control into the layers you don't.
  </Card>
  <Card title="Domestic acquiring, global reach" icon="Globe" url="page:guides/global-coverage">
    Adyen is a licensed acquirer in Europe, the UK, the US, Canada, Brazil, Singapore, Hong Kong, Australia, and more. Cards stay on local rails — auth rates climb, cross-border fees disappear.
  </Card>
</CardGroup>

## What You Can Build

Adyen powers commerce across every vertical where the speed, breadth, and shopper experience of payment is part of the product:

<CardGroup cols={3}>
  <Card title="Ecommerce checkout" icon="ShoppingCart" url="page:guides/payment-use-cases">
    Hosted Drop-in or fully custom — with 3DS2, dynamic routing, and risk built in.
  </Card>
  <Card title="Subscriptions & recurring" icon="Repeat">
    Tokenize once, charge forever. CIT and MIT flows with network-token support.
  </Card>
  <Card title="Marketplaces & platforms" icon="Network">
    Split a single shopper payment across many sellers automatically.
  </Card>
  <Card title="In-person & omnichannel" icon="Smartphone">
    One shopper, every channel. Cross-channel refunds and unified tokens.
  </Card>
  <Card title="Pay-by-Link" icon="Link">
    No frontend? Generate a hosted URL and send it via SMS, email, or chat.
  </Card>
  <Card title="Donations & round-ups" icon="Heart">
    Cause-driven add-ons at checkout — in a single follow-up API call.
  </Card>
</CardGroup>

A full set of vertical case studies and product overviews lives at [adyen.com](https://www.adyen.com/) and [adyen.com/customers](https://www.adyen.com/customers).

## Get Started

1. **[Create a test account](https://ca-test.adyen.com/)** — sign up in the Adyen Customer Area; the test environment mirrors live behaviour.
2. **[Get API credentials](page:guides/get-api-credentials)** — generate a key scoped to your merchant account.
3. **[Pick an SDK](page:get-started/setting-up-sdks)** — TypeScript, Python, Java, .NET, PHP, Ruby, or Go.
4. **[Grab a test card](page:guides/test-card-numbers)** — covers auth, capture, refund, 3DS, and decline scenarios.
5. **Send your first payment** — `POST /payments` with `paymentMethod.type: "scheme"` and watch the `Authorised` response land.

Most integrators are sending payments to a sandbox merchant within five minutes of starting step 1.

## Documentation Map

- **[Make Payments with Adyen API](page:guides/make-payments-with-adyen-api)** — the starting line: hero CTAs, use-case cards, and the three-layer account model
- **[Your Onboarding Journey](page:guides/onboarding-journey)** — a four-stage path from zero to production: Getting Started → Concepts → Resources → Reference
- **[Payment Use Cases](page:guides/payment-use-cases)** — ecommerce, subscriptions, marketplaces, in-person, Pay-by-Link, donations, partial payments
- **[Global Coverage](page:guides/global-coverage)** — regions, currencies, and local payment methods
- **[Get API Credentials](page:guides/get-api-credentials)** — generate, rotate, and scope your keys
- **[Test Card Numbers](page:guides/test-card-numbers)** — every brand, every 3DS profile, every decline reason
- **[Adyen Instant Storefront](page:sample-app/instant-storefront)** — a working sample app generated by the Adyen Context Plugin
- **[API Endpoints — Payments]($e/Payments)** — the core money-movement endpoints; every other endpoint group (Modifications, Recurring, Payment links, Orders, Terminals, Webhooks, …) is one click away

## SDKs, API Spec & Live Sandbox

| Tool | How to access | Description |
|------|---------------|-------------|
| **Code Samples** | Language picker, upper-right corner | Switch between **REST**, **TypeScript**, **Python**, **Java**, **.NET**, **PHP**, **Ruby**, and **Go** — examples update automatically |
| **Download SDK** | **Get SDK** button, upper-left corner | Download a ready-to-use, auto-generated SDK for the selected language |
| **API Spec** | **API Spec** button, upper-left corner | Export the specification in OpenAPI 3.1, Postman Collection 2.0, RAML, and other formats |
| **Live Sandbox** | **Send** button on any endpoint page | Make real API calls against the Adyen test environment directly from the documentation |
| **AI Assistant** | Chat bubble, bottom-right | Ask the API Integration Assistant anything about endpoints, parameters, or best practices |

<Callout type="info">
**Tip:** Pair the in-browser console with the **Postman Collection** export for offline exploration — both call the same Adyen test environment.
</Callout>

## Environments

| Environment | Customer Area | Notes |
|-------------|---------------|-------|
| Test | [ca-test.adyen.com](https://ca-test.adyen.com/) | Behaviourally identical to live. All examples in this portal target test. |
| Live | [ca-live.adyen.com](https://ca-live.adyen.com/) | Live endpoints use a per-customer prefix issued during go-live. Re-generate keys when you switch. |

An Adyen account is required for both environments — [sign up](https://www.adyen.com/signup) or [contact our team](https://www.adyen.com/contact) to provision one.

## Support and Next Steps

- **Integration questions:** ask the **API Integration Assistant** in the bottom-right of this portal — it knows every endpoint and most common patterns.
- **Account, settlement, and live-environment issues:** [Adyen Support](https://help.adyen.com/).
- **Conceptual deep-dives** (compliance, risk, reporting, settlement): [docs.adyen.com](https://docs.adyen.com/).
- **Evaluating Adyen for your business:** [book a demo](https://www.adyen.com/contact) or visit [adyen.com](https://www.adyen.com/).

## Attribution

The SDKs and documentation available in this portal were generated by [APIMatic](https://www.apimatic.io/) based on the publicly available documentation for the [Adyen APIs](https://docs.adyen.com/api-explorer/). APIMatic is not affiliated with, endorsed by, or associated with Adyen in any capacity.