export default function CheckoutSessionSetupFlow(workflowCtx, portal) {
    return {
        Overview: {
            name: "Overview",
            stepCallback: async () => {
                return workflowCtx.showContent(`
## Card Brand Detection → Checkout Session Setup

This recipe walks you through a smart, card-aware checkout setup flow. Instead of blindly creating a checkout session, you first inspect the card to understand what you're dealing with — then confirm available payment methods — and finally create a session that's correctly configured for that card.

### Flow Overview
1. **Detect Card Brand** — Submit the card's BIN (first 6–8 digits) to identify the card network(s) and whether your merchant supports them. Critical for co-badged cards (e.g., Visa + Maestro) where EU regulations require letting the shopper choose.
2. **Get Available Payment Methods** — Fetch the payment methods available for your merchant and the shopper's country to confirm card payments are supported.
3. **Create a Checkout Session** — Spin up a payment session pre-configured with the correct payment method type, ready for Drop-in or Components to pick up on the frontend.

### API Endpoints Involved
- \`POST /cardDetails\`
- \`POST /paymentMethods\`
- \`POST /sessions\`

### Prerequisites
- A **Merchant Account** name — found in your Adyen Customer Area.
- A test **card number** — use Adyen's [test card numbers](https://docs.adyen.com/development-resources/testing/test-card-numbers/) for sandbox testing.
- An API key with the **Checkout Webservice role**.

> **Tip:** The detected card brand from Step 1 is automatically surfaced in Steps 2 and 3 to guide your configuration.
        `);
            },
        },

        "Step 1": {
            name: "Detect Card Brand",
            stepCallback: async (stepState) => {
                return workflowCtx.showEndpoint({
                    description:
                        "## Identify the Card Brand from the BIN\n\n" +
                        "Submit the card's **BIN** (the first 6–8 digits of the card number) along with your `merchantAccount` " +
                        "to identify the card network(s) and whether your merchant supports them.\n\n" +
                        "The response returns a `brands` array with each detected network, a `supported` flag " +
                        "(whether your merchant accepts it), and a `brandImageUrl` for display.\n\n" +
                        "### Why this matters\n\n" +
                        "- If the card is **co-badged** (multiple brands returned), EU PSD2 regulations require you to let the shopper choose which brand to pay with.\n" +
                        "- The `supported` flag tells you instantly whether you can accept this card before the shopper reaches the payment screen.\n\n" +
                        "Use one of Adyen's [test card numbers](https://docs.adyen.com/development-resources/testing/test-card-numbers/) " +
                        "for sandbox testing — enter only the first 8 digits as the BIN.\n\n" +
                        "**Required role:** Checkout Webservice",

                    endpointPermalink: "$e/Payments/getCardDetails",
                    args: {
                        body: {
                            cardNumber: "4111112014267661",
                            countryCode: "FR",
                            merchantAccount: "APIMatic300ECOM",
                        }
                    },
                    verify: (response, setError) => {
                        if (response?.StatusCode >= 200 && response?.StatusCode < 300) {
                            return true;
                        } else {
                            setError(
                                "Failed to retrieve card details. Check your cardNumber BIN and merchantAccount and try again."
                            );
                            return false;
                        }
                    },
                });
            },
        },

        "Step 2": {
            name: "Get Available Payment Methods",
            stepCallback: async (stepState) => {
                const step1 = stepState?.["Step 1"];
                console.log("step state 1", step1)
                // Response shape: { brands: [{ brand, supported, brandImageUrl }] }
                const brands = step1?.body?.brands || step1?.data?.brands;
                const detectedBrand = brands?.[0]?.brand;
                const isSupported = brands?.[0]?.supported;
                const isCoBadged = brands && brands.length > 1;

                const brandSummary = detectedBrand
                    ? (isCoBadged
                        ? `\n\n> 🃏 **Co-badged card detected** (Step 1): The card supports **${brands.map(b => b.brand).join(" + ")}**. ` +
                        `EU regulations require offering the shopper a brand choice if your merchant supports both.\n\n`
                        : `\n\n> 🃏 **Detected card brand** (Step 1): **${detectedBrand}** — ` +
                        (isSupported ? "✅ Supported by your merchant." : "❌ Not supported by your merchant. Review your payment method configuration.") + "\n\n")
                    : "\n\n";

                return workflowCtx.showEndpoint({
                    description:
                        "## Confirm Available Payment Methods\n\n" +
                        "Fetches the payment methods available for your merchant, filtered by the shopper's country and transaction currency." +
                        brandSummary +
                        "Look for **`scheme`** in the returned `paymentMethods` array — this is Adyen's method type for card payments " +
                        "(covering Visa, Mastercard, Amex, and others). If `scheme` is absent, card payments are not enabled for this merchant/country combination.\n\n" +
                        "The `merchantAccount`, `countryCode`, and `amount.currency` you enter here will be reused in Step 3 when " +
                        "creating the checkout session — use the same values.\n\n" +
                        "**Required role:** Checkout Webservice",

                    endpointPermalink: "$e/Payments/getPaymentMethods",

                    verify: (response, setError) => {
                        if (response?.StatusCode >= 200 && response?.StatusCode < 300) {
                            return true;
                        } else {
                            setError(
                                "Failed to retrieve payment methods. Check your merchantAccount and countryCode and try again."
                            );
                            return false;
                        }
                    },
                });
            },
        },

        "Step 3": {
            name: "Create Checkout Session",
            stepCallback: async (stepState) => {
                const step1 = stepState?.["Step 1"];
                const step2 = stepState?.["Step 2"];
                console.log("step state 1", step1)
                console.log("step state 2", step2)

                // Extract brand info from Step 1
                const brands = step1?.body?.brands || step1?.data?.brands;
                const detectedBrand = brands?.[0]?.brand;
                const isSupported = brands?.[0]?.supported;
                const isCoBadged = brands && brands.length > 1;

                // Check card methods confirmed in Step 2
                const methods = step2?.body?.paymentMethods || step2?.data?.paymentMethods;
                const cardMethod = methods?.find(m => m.type === "scheme");

                const brandContext = detectedBrand
                    ? (isCoBadged
                        ? `\n\n> 🃏 **Co-badged card from Step 1:** ${brands.map(b => b.brand).join(" + ")}. ` +
                        `Set \`allowedPaymentMethods: ["scheme"]\` below and ensure your frontend presents a brand selector to the shopper.\n\n`
                        : `\n\n> 🃏 **Card brand from Step 1: \`${detectedBrand}\`** — ` +
                        (isSupported
                            ? `✅ Supported. The session will allow card payments via \`scheme\`.\n\n`
                            : `❌ Not supported by your merchant. The session may reject this card at payment time.\n\n`))
                    : "\n\n";

                const methodsContext = cardMethod
                    ? `> ✅ **Step 2 confirmed** \`scheme\` (card payments) is available for this merchant and country.\n\n`
                    : `> ⚠️ **Step 2** did not confirm card payments for this merchant/country — the session may not present card options.\n\n`;

                return workflowCtx.showEndpoint({
                    description:
                        "## Create the Checkout Session\n\n" +
                        "Creates a payment session for [Drop-in](https://docs.adyen.com/online-payments/build-your-integration/sessions-flow/?platform=Web&integration=Drop-in) " +
                        "or [Components](https://docs.adyen.com/online-payments/build-your-integration/sessions-flow/?platform=Web&integration=Components) integrations." +
                        brandContext +
                        methodsContext +
                        "### Key fields to fill in\n\n" +
                        "- **`merchantAccount`** — same account used in Steps 1 and 2.\n" +
                        "- **`amount`** — the transaction amount and currency (e.g. `{ value: 1000, currency: \"USD\" }` for $10.00).\n" +
                        "- **`reference`** — your unique order reference string.\n" +
                        "- **`returnUrl`** — where to redirect the shopper after payment (can be `https://your-site.com/result` for testing).\n" +
                        "- **`allowedPaymentMethods`** — set to `[\"scheme\"]` to limit to card payments, matching what the card brand detection confirmed.\n\n" +
                        "The response contains a `sessionData` token and `id` — your frontend passes these to the Adyen Web Components or Drop-in to render the payment UI.\n\n" +
                        "**Required role:** Checkout Webservice",

                    endpointPermalink: "$e/Payments/createCheckoutSession",

                    args: {
                        allowedPaymentMethods: ["scheme"],
                    },

                    verify: (response, setError) => {
                        if (response?.StatusCode >= 200 && response?.StatusCode < 300) {
                            return true;
                        } else {
                            setError(
                                "Failed to create the checkout session. Ensure merchantAccount, amount, reference, and returnUrl are all provided and valid."
                            );
                            return false;
                        }
                    },
                });
            },
        },
    };
}