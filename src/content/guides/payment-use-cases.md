# Payment Use Cases

> **One API. Every business model.** From a one-page Shopify clone to a global marketplace with split payouts and in-store terminals — the same endpoints, the same auth, the same response shape.

This guide tours the most common Adyen integration patterns. Each section is self-contained — read the one you need, ignore the rest.

<Callout type="info">
    Every pattern below maps to specific endpoints documented in the <strong>Build</strong> section of this portal. Follow the links inline to jump straight to the reference.
</Callout>

---

## Ecommerce checkout

> **The 90% case.** A shopper lands on a product page, picks a method, pays, you ship.

### Hosted checkout — fastest path

`createCheckoutSession` gives you a hosted, fully PCI-compliant checkout that handles cards, wallets (Apple Pay / Google Pay), and 100+ local methods automatically.

**Flow:**

1. Server → `createCheckoutSession` with `amount`, `currency`, `countryCode`, `reference`.
2. Server → return the session `id` to your frontend.
3. Frontend → load Adyen Web Drop-in, point it at the session.
4. Shopper completes payment. Adyen handles 3DS, redirects, retries.
5. Webhook → confirms the final state.

### Custom checkout — full control

If you need bespoke UI, drop down to `getPaymentMethods` + `createPayment`.

| Endpoint | Role |
| :--- | :--- |
| [`getPaymentMethods`](#endpoints/payments) | Returns the methods available for this shopper's country, currency, and amount. |
| [`createPayment`](#endpoints/payments) | Submits the actual authorisation. |
| [`getPaymentDetails`](#endpoints/payments) | Finalizes payments that require an extra step (3DS, redirect). |

<Callout type="success">
    <strong>Pro tip:</strong> always call <code>getPaymentMethods</code> dynamically — never hard-code your payment list. Adyen rolls out new methods continuously and dynamic lists adapt to shopper geography automatically.
</Callout>

---

## Subscriptions and recurring billing

> Charge a saved card on a schedule — without storing PAN data.

Recurring billing breaks into two patterns:

| Pattern | Description | Example |
| :--- | :--- | :--- |
| **CIT** (Customer-Initiated) | Shopper is on your site and explicitly approves the charge. | "Upgrade my plan" button. |
| **MIT** (Merchant-Initiated) | You charge a stored token without the shopper present. | Monthly subscription renewal. |

### Pattern

1. **First payment** — `createPayment` with `storePaymentMethod: true` and `shopperReference: "<your-customer-id>"`. This vaults the payment method.
2. **List tokens** — `listStoredPaymentMethods` to retrieve what you've vaulted for a shopper.
3. **Subsequent charges** — `createPayment` with the `storedPaymentMethodId`, `shopperInteraction: "ContAuth"`, and `recurringProcessingModel` set to `Subscription` or `UnscheduledCardOnFile`.
4. **Clean up** — `deleteStoredPaymentMethod` when a shopper churns or asks to delete their card.

<Callout type="info">
    Adyen automatically participates in <strong>network token</strong> programs (Visa, Mastercard). When a shopper's physical card expires or is reissued, the stored token continues to work — auth rates stay high without any code changes on your side.
</Callout>

---

## Marketplaces and platforms

> **One shopper payment, many sellers.** Split funds at authorisation time — automatically, by rule, or per transaction.

If you run a marketplace, the rules of the game are:

- The **buyer** sees one charge.
- The **sellers** each receive their share.
- **You** keep the platform commission.
- **Adyen** handles the funds movement, regulatory routing, and 1099 reporting (where applicable).

### Endpoints to know

| Endpoint | What it does |
| :--- | :--- |
| [`createSplitConfiguration`](#endpoints/split-configuration-merchant-level) | Define a named splitting rule (e.g. "platform takes 12%, seller gets remainder"). |
| [`createSplitConfigurationRule`](#endpoints/split-configuration-merchant-level) | Add granular logic — by payment method, country, or amount band. |
| [`updateSplitLogic`](#endpoints/split-configuration-merchant-level) | Adjust live rules without a redeploy. |
| [`createPayment`](#endpoints/payments) | Pass the `splits` array on the payment itself for per-transaction overrides. |

### Onboarding sub-merchants

Marketplaces also need to provision their sellers. The **company-level** endpoints make that programmatic:

- `createMerchant` — spin up a new merchant under your company.
- `activateMerchant` — flip it to live when KYC is complete.
- `createCompanyApiCredential` + `generateCompanyApiKey` — give the seller their own keys.

---

## Pay-by-Link

> No frontend needed. Generate a URL, send it via SMS / email / WhatsApp, get paid.

Pay-by-Link is the lowest-effort integration Adyen offers — a single API call returns a hosted, branded payment page.

### Example

```http
POST /paymentLinks
{
  "amount": { "value": 4999, "currency": "EUR" },
  "reference": "INV-2026-0042",
  "shopperEmail": "shopper@example.com",
  "countryCode": "NL",
  "expiresAt": "2026-05-27T18:00:00+02:00"
}
```

Response includes a `url` — send it, that's it.

**Endpoints:** [`createPaymentLink`](#endpoints/payment-links), [`getPaymentLink`](#endpoints/payment-links), [`updatePaymentLink`](#endpoints/payment-links).

### Where it shines

- **Invoice-based businesses** — attach a link to the invoice PDF.
- **Sales-led ecommerce** — send a link after a phone or email negotiation.
- **Field services** — plumber finishes the job, texts the link, gets paid before leaving.
- **Restaurants** — open-tab payments via QR code at the table.

---

## In-person and omnichannel

> A shopper pays in-store today, online next week, on your mobile app the week after — and you recognize them every time.

### Terminal management

Your control plane sits on top of physical card readers:

| Endpoint | Use it for |
| :--- | :--- |
| [`listTerminals`](#endpoints/terminals-terminal-level) | See every device tied to your account, with status. |
| [`reassignTerminal`](#endpoints/terminals-terminal-level) | Move a device between stores or merchants without re-provisioning. |
| [`scheduleTerminalActions`](#endpoints/terminal-actions-terminal-level) | Push reboots, app installs, config syncs to a device or fleet. |
| [`updateTerminalSettings`](#endpoints/terminal-settings-terminal-level) | Configure receipts, tipping prompts, currency conversion, screensavers. |
| [`updateTerminalLogo`](#endpoints/terminal-settings-terminal-level) | Brand the device idle screen. |

### Unified shopper

The key to omnichannel is the **shopper reference** — a single ID you pass on every transaction, in-store or online. Adyen ties the records together; you get:

- Cross-channel refunds (return an online order in-store, or vice-versa).
- Cross-channel tokens (charge an in-store card later online).
- A unified shopper profile in the Customer Area.

---

## Donations and round-ups

> Cause-driven add-ons at checkout — in a single API pattern.

Adyen's donations product runs on top of any existing payment.

| Endpoint | Use it for |
| :--- | :--- |
| [`getDonationCampaigns`](#endpoints/donations) | List the active charities and round-up campaigns you've configured. |
| [`createDonation`](#endpoints/donations) | Charge the donation against the original payment's payment method. |

The pattern: complete the main payment, prompt the shopper to round up or add a fixed amount, call `createDonation` referencing the original `pspReference`. No second authorisation, no second card form.

---

## Partial payments and gift cards

> "I want to pay €60 of this €100 order with a gift card and the rest on Visa."

The **Orders** API exists exactly for this.

1. `createOrder` — open a partial-payment session for the full amount.
2. `getPaymentMethodBalance` — check what's left on a gift card before applying it.
3. `createPayment` referencing the order — apply each tender (gift card, card, wallet) as a sub-payment.
4. `cancelOrder` — release any unused funds if the shopper bails.

**Endpoints:** [`createOrder`](#endpoints/orders), [`cancelOrder`](#endpoints/orders), [`getPaymentMethodBalance`](#endpoints/orders).

---

## Modifications — the after-payment lifecycle

Auth is just the start. Every payment may be:

| Action | Endpoint | When |
| :--- | :--- | :--- |
| **Captured** | [`capturePayment`](#endpoints/modifications) | At ship time, after manual review, on delayed billing. |
| **Refunded** | [`refundPayment`](#endpoints/modifications) | Customer returns the goods. Captured funds flow back. |
| **Reversed** | [`reversePayment`](#endpoints/modifications) | Best-effort cancel-or-refund in one call. Use when you don't know whether capture has run. |
| **Cancelled** | [`cancelPayment`](#endpoints/modifications), [`cancelAuthorisedPayment`](#endpoints/modifications) | Release a still-authorised reservation. |
| **Amount-updated** | [`updatePaymentAmount`](#endpoints/modifications) | Hotel adds room service to an existing auth before capture. |

---

## Choosing the right pattern

| If you are building… | Start with |
| :--- | :--- |
| A direct-to-consumer ecommerce store | Hosted checkout (`createCheckoutSession`) + webhooks |
| A SaaS platform with monthly billing | Vault on first payment, then MIT recurring |
| A marketplace or multi-seller platform | Split configurations + company-level merchant onboarding |
| An invoice or sales-led business | Pay-by-Link |
| A retail or hospitality chain | Terminal endpoints + unified shopper-reference strategy |
| A non-profit or cause-driven brand | Payments + Donations |
| Anything with gift cards or vouchers | Orders API |

---

Have a use case that doesn't fit any of these? Ask the **API Integration Assistant** in the bottom-right of this portal — it knows every endpoint and most common patterns.