# Global Coverage

> **One contract. 200+ markets. 150+ currencies. 100+ local payment methods.** A single Adyen integration is enough to take payments almost anywhere your customers live.

Adyen is unusual among payment platforms in being a **licensed acquirer** in many of the world's largest markets — not just a gateway sitting in front of someone else's bank. That changes the economics. Domestic acquiring means cards stay on local rails, FX surprises disappear, and auth rates climb.

<Callout type="info">
    Pair this guide with <a href="#endpoints/payments"><code>getPaymentMethods</code></a> — pass the shopper's country and amount, and Adyen returns the exact set of methods available, ranked for that geography.
</Callout>

---

## Where Adyen acquires directly

When Adyen acquires locally, your traffic clears through a domestic processor instead of routing internationally. The shopper's bank sees a domestic transaction. Auth rates go up, cross-border fees go away.

### Europe

| Region | Notes |
| :--- | :--- |
| **Eurozone (EU/EEA)** | Direct acquiring across all member states. PSD2 SCA handled at the platform level. |
| **United Kingdom** | Post-Brexit, Adyen operates as a separately licensed UK acquirer — same integration, separate compliance scope. |
| **Switzerland, Norway** | Domestic acquiring with native currency settlement. |

### Americas

| Region | Notes |
| :--- | :--- |
| **United States** | Full domestic acquiring with Visa, Mastercard, Amex, Discover. Network tokens supported across all brands. |
| **Canada** | Domestic CAD acquiring with Interac integration. |
| **Brazil** | Local entity with installment-plan support (`installments`), Boleto, Pix, and Brazilian card schemes (Elo, Hipercard). |
| **Mexico** | Domestic acquiring for MXN and the major LatAm card networks. |

### Asia-Pacific

| Region | Notes |
| :--- | :--- |
| **Singapore, Hong Kong** | Regional hubs with direct acquiring and broad APAC method coverage. |
| **Australia, New Zealand** | Domestic acquiring including eftpos integration. |
| **Japan** | Direct acquiring with JCB, plus 3DS profile tuned for local issuer behaviour. |
| **India** | RBI-compliant tokenization and the local card-on-file mandates handled automatically. |

---

## Local payment methods

Adyen exposes local methods through the **same** `/payments` endpoint and the **same** payment-method-type pattern. There's no separate API per method — your integration is identical whether you accept Visa or iDEAL.

### Highlights, by region

| Region | Methods you can accept |
| :--- | :--- |
| **Netherlands** | iDEAL, Bancontact (cross-border), SEPA Direct Debit |
| **Germany, Austria, Switzerland** | SOFORT, giropay, EPS, SEPA, Klarna |
| **Belgium** | Bancontact, KBC/CBC payment button |
| **France** | Cartes Bancaires, Bancontact, Klarna |
| **United Kingdom** | Cards, Apple Pay, Google Pay, Klarna, Clearpay |
| **Nordics** | MobilePay, Vipps, Swish, Klarna, Trustly |
| **Italy** | MyBank, Bancomat, Satispay |
| **Spain, Portugal** | Multibanco, MB WAY |
| **United States** | Cards, Apple Pay, Google Pay, PayPal, Venmo, Affirm, Afterpay/Clearpay, Zelle (where supported) |
| **Latin America** | Pix, Boleto Bancário (BR), OXXO, SPEI (MX), PSE (CO) |
| **China** | Alipay, WeChat Pay, UnionPay (incl. UnionPay SecurePlus) |
| **Southeast Asia** | GrabPay, GoPay, OVO, DANA, ShopeePay, PayNow, FPX (MY) |
| **India** | UPI, Net Banking, RuPay, EMI / installment plans |
| **Japan** | JCB, Konbini, Pay Easy |
| **Australia / NZ** | Eftpos, BPay, Afterpay, POLi |
| **Middle East / Africa** | mada (SA), KNET (KW), QPay (QA), local mobile money in select markets |

### Wallets, BNPL, and global rails

These work everywhere Adyen does:

| Category | Methods |
| :--- | :--- |
| **Wallets** | Apple Pay, Google Pay, Samsung Pay, PayPal, Venmo, Amazon Pay |
| **Buy-Now-Pay-Later** | Klarna, Afterpay/Clearpay, Affirm, Atome, ZIP |
| **Crypto-adjacent** | (varies — check your account configuration) |

<Callout type="success">
    <strong>You never have to memorize this list.</strong> Call <code>getPaymentMethods</code> with the shopper's country and amount, and Adyen returns the available set — already filtered, already ranked, already configured.
</Callout>

---

## Currencies and settlement

| Capability | Details |
| :--- | :--- |
| **Process in** | 150+ currencies. Charge shoppers in their local currency. |
| **Settle in** | Configurable per merchant — settle in one currency, multiple, or per-region. |
| **FX** | Adyen handles conversion. Rates are transparent and visible in your reporting. |
| **DCC** (Dynamic Currency Conversion) | Available on cards and supported terminals — offer shoppers the choice at the point of sale. |

---

## Regulatory and compliance coverage

Built into the platform, not your problem:

| Region / scheme | What Adyen handles for you |
| :--- | :--- |
| **EU / UK** | PSD2 Strong Customer Authentication (SCA), 3D Secure 2 routing, exemption logic. |
| **India** | RBI tokenization mandate, card-on-file rules, EMI flows. |
| **Brazil** | Installment-plan handling, Pix and Boleto regulatory routing. |
| **Japan** | 3DS profile, JCB-specific compliance. |
| **United States** | PCI DSS, network token participation, dispute representment helpers. |
| **Global** | PCI DSS Level 1 certification on the platform — your integration inherits the cert. |

---

## Picking your endpoints by geography

For most teams, the right model is:

1. **Single merchant account per legal entity** in each major region you operate in.
2. **One payment-methods configuration per merchant**, managed via [Payment methods — merchant level](#endpoints/payment-methods-merchant-level).
3. **Dynamic method retrieval** via [`getPaymentMethods`](#endpoints/payments) on every checkout — never hard-code your method list.

For platforms with sub-merchants in many countries:

- Use [Account — company level](#endpoints/account-company-level) to provision merchants per region.
- Use [API credentials — company level](#endpoints/api-credentials-company-level) to scope keys per region.
- Use [Webhooks — merchant level](#endpoints/webhooks-merchant-level) to route async events to the right backend.

---

## Going live in a new market

The integration doesn't change. What changes is configuration:

1. Ask your Adyen contact to enable the new country / currency on your merchant account.
2. Enable the local payment methods you want in the Customer Area (or via [`createPaymentMethodSetting`](#endpoints/payment-methods-merchant-level)).
3. Update your checkout to call `getPaymentMethods` with the new `countryCode` — that's it.
4. Verify a low-value live transaction. Ship.

<Callout type="info">
    Adyen's <strong>RevenueAccelerate</strong> features — auto-rescue, network tokens, intelligent retry, account updater — apply automatically in every market they're available in. You don't enable them per region; they're on by default.
</Callout>

---

## What's next?

- **[Payment use cases →](page:guides/payment-use-cases)** — match the global capabilities to your business model.
- **[Onboarding journey →](page:guides/onboarding-journey)** — a step-by-step path from zero to production.
- **[Make Payments with Adyen API →](page:guides/make-payments-with-adyen-api)** — back to the start.