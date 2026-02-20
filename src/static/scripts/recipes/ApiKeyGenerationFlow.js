export default function ApiKeyGenerationFlow(workflowCtx, portal) {
    return {
        Overview: {
            name: "Overview",
            stepCallback: async () => {
                return workflowCtx.showContent(`
## API Key Rotation Flow

This recipe walks you through safely rotating an API key for a merchant-level credential — entirely through the API, without touching the Customer Area.

### Flow Overview
1. **List Merchants** — Retrieve the merchants under your company account and identify the target merchant.
2. **List API Credentials** — Fetch the API credentials for that merchant to identify the credential to rotate.
3. **Generate New API Key** — Rotate the API key for the selected credential. The old key remains valid for 24 hours to allow a safe cutover.

### API Endpoints Involved
- \`GET /companies/{companyId}/merchants\`
- \`GET /merchants/{merchantId}/apiCredentials\`
- \`POST /merchants/{merchantId}/apiCredentials/{apiCredentialId}/generateApiKey\`

### ⚠️ Prerequisites
- Your **Company ID** (\`companyId\`) — found in your Adyen Customer Area under **Settings > Account**.
- An API key with the **Management API — API credentials read and write** role.

> **Tip:** The \`merchantId\` from Step 1 and \`credentialId\` from Step 2 are automatically passed into subsequent steps.
        `);
            },
        },

        "Step 1": {
            name: "List Merchants",
            stepCallback: async (stepState) => {
                return workflowCtx.showEndpoint({
                    description:
                        "Returns the list of merchant accounts under the company account specified in the path.\n\n" +
                        "Enter your **`companyId`** in the path parameter. After a successful call, the **first merchant's ID** " +
                        "from the `data` array is automatically captured and pre-filled in Step 2.\n\n" +
                        "If you have multiple merchants, note the `id` of your intended target — " +
                        "you can adjust the pre-filled value in Step 2 accordingly.\n\n" +
                        "**Required role:** Management API — Account read",

                    endpointPermalink:
                        "$e/Account%20-%20company%20level/listCompanyMerchants",
                    args: {
                        companyId: "APIMatic300"
                    },
                    verify: (response, setError) => {
                        if (response?.StatusCode >= 200 && response?.StatusCode < 300) {
                            // Response shape: { data: [ { id, companyId, ... }, ... ], itemsTotal, ... }
                            return true;
                        } else {
                            setError(
                                "Failed to list merchants. Please check your companyId and API key and try again."
                            );
                            return false;
                        }
                    },
                });
            },
        },

        "Step 2": {
            name: "List API Credentials",
            stepCallback: async (stepState) => {
                const step1 = stepState?.["Step 1"];
                console.log("Step state 1", step1)
                // Response shape confirmed: { data: [ { id, companyId, name, ... } ], itemsTotal, ... }
                const merchants = step1?.data?.data;
                const firstMerchant = merchants?.[0];
                const merchantId = firstMerchant?.id;

                if (!merchantId) {
                    return workflowCtx.showContent(
                        "**Error:** Merchant ID not found from Step 1. Please complete Step 1 successfully before proceeding."
                    );
                }

                return workflowCtx.showEndpoint({
                    description:
                        "Returns the list of [API credentials](https://docs.adyen.com/development-resources/api-credentials) " +
                        `for merchant **\`${merchantId}\`** (captured from Step 1).\n\n` +
                        "After a successful call, the **first credential's ID** from the `data` array is automatically " +
                        "captured and pre-filled in Step 3.\n\n" +
                        "Review the list to identify the specific credential whose key you want to rotate. " +
                        "You can adjust the pre-filled value in Step 3 if needed.\n\n" +
                        "**Required role:** Management API — API credentials read and write",

                    endpointPermalink:
                        "$e/API%20credentials%20-%20merchant%20level/listMerchantApiCredentials",

                    args: {
                        merchantId: merchantId,
                    },

                    verify: (response, setError) => {
                        if (response?.StatusCode >= 200 && response?.StatusCode < 300) {
                            return true;
                        } else {
                            setError(
                                "Failed to list API credentials. Ensure the merchantId is correct and try again."
                            );
                            return false;
                        }
                    },
                });
            },
        },

        "Step 3": {
            name: "Generate New API Key",
            stepCallback: async (stepState) => {
                const step1 = stepState?.["Step 1"];
                const step2 = stepState?.["Step 2"];
                console.log("step 1 stepsate", step1);
                console.log("step 2 stepstate", step2)

                // merchantId from Step 1 response: body.data[0].id
                const merchantId = step1?.data?.data[0]?.id;

                // credentialId from Step 2 response: body.data[0].id
                const credentialId = step2?.data?.data[0]?.id;

                if (!merchantId || !credentialId) {
                    return workflowCtx.showContent(
                        "**Error:** Missing Merchant ID or Credential ID from previous steps. " +
                        "Please complete Steps 1 and 2 successfully before proceeding."
                    );
                }

                return workflowCtx.showEndpoint({
                    description:
                        "Generates a new API key for credential " +
                        `**\`${credentialId}\`** on merchant **\`${merchantId}\`** (captured from Steps 1 and 2).\n\n` +
                        "### ⚠️ Important — Safe Cutover Window\n\n" +
                        "- The **new API key** is ready to use within a **few minutes** of generation.\n" +
                        "- The **old API key** remains valid for **24 hours** after generating the new one — " +
                        "use this window to update your integration without downtime.\n" +
                        "- After 24 hours, the old key is permanently invalidated.\n\n" +
                        "Store the returned `key` value securely (e.g. in a secrets manager). " +
                        "It will **not** be shown again.\n\n" +
                        "**Required role:** Management API — API credentials read and write",

                    endpointPermalink:
                        "$e/API%20key%20-%20merchant%20level/generateMerchantApiKey",

                    args: {
                        merchantId: merchantId,
                        apiCredentialId: credentialId,
                    },

                    verify: (response, setError) => {
                        if (response?.StatusCode >= 200 && response?.StatusCode < 300) {
                            return true;
                        } else {
                            setError(
                                "Failed to generate a new API key. Ensure the merchantId and apiCredentialId are correct and try again."
                            );
                            return false;
                        }
                    },
                });
            },
        },
    };
}