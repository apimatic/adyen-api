# Make Payments with the Adyen API

> **Accept payments in 200+ markets — with one integration, one platform, one API.**

The Adyen API powers commerce for some of the world's largest brands. Whether you are processing a single online checkout, running a global subscription business, or orchestrating a network of in-store terminals, this is your starting line.

<Callout type="success">
    <strong>Make your first payment in under 5 minutes.</strong> Spin up a test account, grab an API key, and run a live <code>/payments</code> call before your coffee gets cold.
</Callout>

---

## Start here

| Get API Keys | Make Your First API Call | View SDKs | Open API Reference |
| :--- | :--- | :--- | :--- |
| Sign in to your Adyen Customer Area and generate a key linked to your merchant account. | Send a test payment with one of our pre-built cards — no production data required. | TypeScript, Python, Java, PHP, Ruby, .NET, Go — all auto-generated, all idiomatic. | Browse every endpoint, model, and response code in one searchable place. |
| **[Get API Credentials →](page:guides/get-api-credentials)** | **[Run a Test Payment →](page:guides/test-card-numbers)** | **[Setting Up SDKs →](page:get-started/setting-up-sdks)** | **[API Reference →](#endpoints)** |

---

## Time to first call

<Callout type="info">
    <strong>Most developers go from sign-up to first successful payment in under 5 minutes.</strong> Here's the path:
</Callout>

1. **Minute 0–1** — Create an Adyen test account in the [Customer Area](https://ca-test.adyen.com/).
2. **Minute 1–2** — [Generate an API key](page:guides/get-api-credentials) tied to your merchant account.
3. **Minute 2–3** — Copy the cURL or SDK snippet from any endpoint page.
4. **Minute 3–4** — Replace the placeholder with your key and one of our [test card numbers](page:guides/test-card-numbers).
5. **Minute 4–5** — Hit send. You should see an `Authorised` response — congratulations, you have processed your first Adyen payment.

---

## Pick your integration path

Adyen's account model is structured in three layers — **company**, **merchant**, and **terminal**. Pick the layer that matches what you are building.

### Company-level — for platforms, marketplaces, and groups

Manage the umbrella entity that owns one or more merchant accounts. Ideal for **platforms onboarding sub-merchants**, **enterprises with multiple brands**, or **anyone managing org-wide permissions**.

| Use case | What you'll build with | Where to go |
| :--- | :--- | :--- |
| List & inspect all merchants under your company | `listCompanies`, `getCompany`, `listCompanyMerchants` | [Account — company level](#endpoints/account-company-level) |
| Provision API credentials and keys for new merchants | `createCompanyApiCredential`, `generateCompanyApiKey` | [API credentials — company level](#endpoints/api-credentials-company-level) |
| Manage org-wide webhooks and security | `createCompanyWebhook`, `generateCompanyWebhookHmac` | [Webhooks — company level](#endpoints/webhooks-company-level) |
| Onboard users with role-based access | `createCompanyUser`, `updateCompanyUser` | [Users — company level](#endpoints/users-company-level) |

### Merchant-level — for online stores and direct sellers

The bread-and-butter layer for any business taking payments. **Ecommerce sites**, **subscription businesses**, **SaaS billing**, and **mobile apps** live here.

| Use case | What you'll build with | Where to go |
| :--- | :--- | :--- |
| Accept card and local-method payments | `createPayment`, `getPaymentMethods`, `createCheckoutSession` | [Payments](#endpoints/payments) |
| Generate hosted Pay-by-Link checkouts | `createPaymentLink`, `getPaymentLink`, `updatePaymentLink` | [Payment links](#endpoints/payment-links) |
| Capture, refund, cancel, or reverse | `capturePayment`, `refundPayment`, `cancelPayment`, `reversePayment` | [Modifications](#endpoints/modifications) |
| Tokenize and reuse shopper payment methods | `listStoredPaymentMethods`, `createStoredPaymentMethod` | [Recurring](#endpoints/recurring) |
| Configure local payment methods per merchant | `listPaymentMethodSettings`, `createPaymentMethodSetting` | [Payment methods — merchant level](#endpoints/payment-methods-merchant-level) |
| Split funds across sellers (marketplace flows) | `createSplitConfiguration`, `updateSplitLogic` | [Split configuration — merchant level](#endpoints/split-configuration-merchant-level) |

### Terminal-level — for in-person and omnichannel

Provision, configure, and monitor physical card readers. **Retail**, **hospitality**, **events**, **kiosks**, and **unified-commerce** integrations.

| Use case | What you'll build with | Where to go |
| :--- | :--- | :--- |
| Discover and reassign terminals across stores | `listTerminals`, `reassignTerminal` | [Terminals — terminal level](#endpoints/terminals-terminal-level) |
| Push remote actions to devices (reboot, install, sync) | `scheduleTerminalActions`, `listCompanyTerminalActions` | [Terminal actions](#endpoints/terminal-actions-terminal-level) |
| Brand terminals with custom logos and settings | `updateTerminalLogo`, `updateTerminalSettings` | [Terminal settings — terminal level](#endpoints/terminal-settings-terminal-level) |
| Order new terminals and manage shipping | `createCompanyTerminalOrder`, `listCompanyShippingLocations` | [Terminal orders — company level](#endpoints/terminal-orders-company-level) |
| Distribute Android apps and certificates to fleet | `createAndroidApp`, `uploadAndroidCertificate` | [Android files — company level](#endpoints/android-files-company-level) |

---

## Adyen payments — by use case

We built the API to flex around your business model, not the other way around.

### Ecommerce checkout

Drop in a hosted checkout, or build a fully custom one with Components. Either way, you get **3D Secure 2** authentication, **dynamic 3DS routing**, and **risk scoring** baked in.

- Start with `createCheckoutSession` — Adyen handles the heavy lifting, you handle the UI.
- Pair with `getPaymentMethods` to dynamically surface the right methods per shopper geography.

### Subscriptions and recurring billing

Tokenize a card once. Charge it forever — across MIT (merchant-initiated) and CIT (customer-initiated) flows, with full **network-token** support to keep auth rates high even when cards expire.

- `createStoredPaymentMethod` to vault, `createPayment` with the token to charge.

### Marketplaces and platforms

Split a single shopper payment across multiple sellers automatically. Configure splits per merchant, per transaction, or by rule.

- `createSplitConfiguration` lets you define the logic. `updateSplitLogic` lets you adapt it without a redeploy.

### In-person and unified commerce

The same `paymentMethod` token taken in-store can be charged later online — and vice versa. One shopper, one customer-id, every channel.

- Terminal endpoints handle the device side; payment endpoints handle the rails.

### Pay-by-Link

No frontend? No problem. Generate a hosted payment URL, send it via SMS, email, or chat, and let the shopper finish on their own time.

- `createPaymentLink` returns a URL. That's the whole integration.

### Donations and charity round-ups

Run cause-driven add-ons at checkout in a single API call.

- `getDonationCampaigns`, then `createDonation` referencing the original payment.

---

## Global coverage

<Callout type="info">
    <strong>One contract. 200+ markets. 150+ currencies. 100+ local payment methods.</strong>
</Callout>

Adyen is a **licensed acquirer** in Europe, North America, the UK, Singapore, Hong Kong, Australia, New Zealand, and Brazil — and a **direct connection** to local schemes everywhere else. That means:

- **Higher auth rates** — domestic acquiring routes cards through local rails, avoiding cross-border declines.
- **No FX surprises** — process in 150+ currencies, settle in the ones you choose.
- **Local methods, native** — iDEAL, Bancontact, Boleto, Pix, GrabPay, Alipay, WeChat Pay, Klarna, Afterpay, and dozens more — all behind the same `/payments` endpoint.
- **Regulatory coverage built in** — PSD2 SCA, India RBI mandates, Brazil's installment rules, Japan's 3DS profile — handled at the platform level.

Use [`getPaymentMethods`](#endpoints/payments) with the shopper's country and amount, and Adyen returns the right set — automatically.

---

## What's next?

| Next step | Why it matters |
| :--- | :--- |
| **[Your onboarding journey →](page:guides/onboarding-journey)** | A guided path from zero to production — built around how teams actually integrate. |
| **[Explore payment use cases →](page:guides/payment-use-cases)** | Concrete patterns for ecommerce, subscriptions, marketplaces, and more. |
| **[See where we operate →](page:guides/global-coverage)** | Regions, currencies, and local methods, mapped out. |
| **[Try the sample app →](page:sample-app/instant-storefront)** | A working storefront, generated with a single command. |

<Callout type="success">
    Stuck? The <strong>API Integration Assistant</strong> in the bottom-right corner of this portal can answer almost any question about endpoints, parameters, and best practices — try it.
</Callout>