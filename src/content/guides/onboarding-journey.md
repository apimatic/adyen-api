# Your Adyen Onboarding Journey

> **A four-stage path from zero to production.** Built around the way real integration teams work — not the order our SDK happens to live in.

Most payment APIs throw you at a reference doc and wish you luck. We don't. This page walks you through the integration like a senior engineer would — from "what is this thing" all the way to "we're live in production."

<Callout type="info">
    <strong>Estimated time:</strong> 30 minutes to read end-to-end. A few hours to a few days to actually build, depending on your scope. Skip ahead — every stage is independent.
</Callout>

---

## Stage 1 — Getting Started

> Set up your environment, get a key, send a test payment.

| Step | What you do | Why it matters |
| :--- | :--- | :--- |
| **1. Create a test account** | Sign up at [ca-test.adyen.com](https://ca-test.adyen.com/) | Adyen's test environment mirrors production behaviour without moving real money. |
| **2. Generate API credentials** | Follow [Get API Credentials](page:guides/get-api-credentials) | API keys scope your integration's permissions and identify your traffic to Adyen. |
| **3. Pick an SDK** | See [Setting Up SDKs](page:get-started/setting-up-sdks) | TypeScript, Python, Java, PHP, Ruby, .NET, Go — type-safe, idiomatic, auto-updated. |
| **4. Grab test cards** | Use the [Test Card Numbers](page:guides/test-card-numbers) | Validate auth, capture, refund, 3DS, and decline scenarios — without burning real cards. |
| **5. Send your first call** | Hit `/paymentMethods` or `/payments` | Confirm the wiring works end-to-end before you write business logic. |

<Callout type="success">
    <strong>Done with Stage 1?</strong> You have a working API key, an SDK installed, and a successful test response. That's the hardest part. From here it's all building.
</Callout>

---

## Stage 2 — Learn the Concepts

> Understand the model, then write better code.

Skip this stage at your peril. Adyen's API encodes a few non-obvious payment concepts — getting them right up front saves you days of debugging later.

### The account hierarchy

Adyen organizes everything in three layers:

| Layer | Owns | You use it when… |
| :--- | :--- | :--- |
| **Company** | One or more merchants | You're a platform onboarding sub-merchants, or an enterprise with multiple brands. |
| **Merchant** | Payment configuration, methods, splits, webhooks | You're a single business taking payments — this is where 90% of your traffic lives. |
| **Terminal** | Physical card readers and their settings | You're doing in-person or omnichannel commerce. |

Most endpoints exist at more than one layer (e.g. `Webhooks - company level` vs `Webhooks - merchant level`). Pick the layer that matches your control plane.

### Payment lifecycle

Every Adyen payment moves through a state machine:

```
authorise  →  capture  →  settle
     ↓           ↓
   cancel      refund / reverse
```

- **Authorise** (`createPayment`) — reserves funds on the shopper's card.
- **Capture** (`capturePayment`) — moves the funds toward you. Can be immediate or delayed.
- **Refund** / **Reverse** (`refundPayment`, `reversePayment`) — returns funds to the shopper.
- **Cancel** (`cancelPayment`, `cancelAuthorisedPayment`) — releases the reservation before capture.

Delayed capture is a power-tool — use it for ship-on-fulfilment ecommerce, hotel holds, or any flow where the final amount is unknown at authorise.

### Idempotency and references

Every state-changing call accepts an **idempotency key** (`Idempotency-Key` header). Use it. Network blips happen — idempotency keys turn "did that go through?" from a nightmare into a one-line retry.

Every payment also has a **merchant reference** (`reference` field) — your own ID for the transaction. Store it. Pass it. Search by it.

### Webhooks — the source of truth

API responses tell you what happened *right now*. Webhooks tell you what happened *eventually*. Capture, refund, dispute, and chargeback events all arrive asynchronously.

- Set up webhooks: see [Webhooks — merchant level](#endpoints/webhooks-merchant-level)
- Always verify the HMAC signature — never trust an unverified webhook.

---

## Stage 3 — Development Resources

> Tools that make the build itself faster.

### SDKs

Every language gets the same surface area. Pick yours from the **language switcher** in the top-right — every code sample on this portal updates instantly.

| Language | Package |
| :--- | :--- |
| TypeScript / Node.js | `adyen-apimatic-sdk` on npm |
| Python | `adyen-apimatic-sdk` on PyPI |
| Java | `io.sdks:adyen-apimatic-sdk` on Maven |
| .NET | `AdyenApimaticSDK` on NuGet |
| PHP | `apimatic-adyen/adyen-apimatic-sdk` on Packagist |
| Ruby | `adyen-apimatic-sdk` on RubyGems |

### AI integrations

Cursor, VS Code, and Claude Code all have first-class plugins. Open any SDK download page and you'll see a one-click install for your IDE — the assistant will know your endpoints, your models, and your auth pattern.

### Sample apps

- **[Adyen Instant Storefront](page:sample-app/instant-storefront)** — a working storefront with products, payment links, and an order dashboard. Generated in a single command via the Adyen Context Plugin.

### Recipes

Pre-built workflows you can clone, customize, and ship:

- **[API Key Generation Flow](page:recipes/ApiKeyGenerationFlow)** — provision keys programmatically for new merchants.
- **[Credentials Security Audit Flow](page:recipes/CredentialsSecurityAuditFlow)** — periodically inspect key usage and rotate.
- **[Checkout Session Setup Flow](page:recipes/CheckoutSessionSetupFlow)** — end-to-end session orchestration.

### Try-it-in-browser console

Every endpoint page on this portal includes a **live console**. Paste your test key, edit the body, hit send, and watch the response stream in. No Postman setup, no curl gymnastics.

---

## Stage 4 — Technical Documentation

> The reference, in depth, when you need to look something up.

This is where you live once you're shipping. Bookmark these.

| Section | What's in it |
| :--- | :--- |
| **[Payments](#endpoints/payments)** | The core endpoints: `createPayment`, `getPaymentMethods`, `createCheckoutSession`, plus card-detail and session retrieval. |
| **[Modifications](#endpoints/modifications)** | Capture, refund, cancel, reverse, amount-update — every post-auth lifecycle event. |
| **[Payment links](#endpoints/payment-links)** | Hosted checkout in a single API call. |
| **[Recurring](#endpoints/recurring)** | Tokenize cards, list stored methods, charge MIT/CIT flows. |
| **[Orders](#endpoints/orders)** | Partial-payment orchestration — gift cards plus a card, vouchers plus a wallet, etc. |
| **[Donations](#endpoints/donations)** | Round-up and standalone donation flows. |
| **[Utility](#endpoints/utility)** | Apple Pay sessions, origin keys, PayPal updates, shopper-ID validation. |
| **[Account, Users, API Credentials, Webhooks](#endpoints)** | Platform-management endpoints across company / merchant / store levels. |
| **[Terminals, Terminal Orders, Terminal Settings, Terminal Actions](#endpoints)** | Everything you need to run a fleet of in-person devices. |
| **[Models](#models)** | Every request and response object, fully typed. |

---

## Going to production

When the integration is solid in test, the production cutover is short:

1. Re-generate an API key in your **live** Customer Area (test keys do not work in production).
2. Swap the base URL — the SDKs expose a single environment flag.
3. Re-register webhooks in live.
4. Run a low-value real transaction end-to-end before you flip traffic.

<Callout type="success">
    Adyen's test and live environments are <strong>behaviourally identical</strong>. If it works in test, it works live. The cutover is configuration, not code.
</Callout>

---

## Need help?

| Channel | Best for |
| :--- | :--- |
| **API Integration Assistant** (bottom-right of this portal) | "How do I…" questions, code snippets, debugging your last response. |
| [Adyen documentation](https://docs.adyen.com/) | Conceptual deep-dives — compliance, settlement, reporting, risk. |
| [Adyen support](https://help.adyen.com/) | Account-specific issues, live-environment problems, settlement queries. |