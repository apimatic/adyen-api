export default function CredentialsSecurityAuditFlow(workflowCtx, portal) {
    return {
        Overview: {
            name: "Overview",
            stepCallback: async () => {
                return workflowCtx.showContent(`
## Credentials Security Audit Flow

This recipe walks you through auditing the security posture of your API credentials at the company level.

### Flow Overview
1. **List API Credentials** — Retrieve all API credentials under your company account.
2. **Check Allowed Origins** — Inspect the domain restrictions for the first credential. An empty list means any domain can use it — a security risk.
3. **Review Credential Details** — Examine the credential's full profile: its roles, active status, and client key.

### API Endpoints Involved
- \`GET /companies/{companyId}/apiCredentials\`
- \`GET /companies/{companyId}/apiCredentials/{apiCredentialId}/allowedOrigins\`
- \`GET /companies/{companyId}/apiCredentials/{apiCredentialId}\`

### ⚠️ Prerequisites
- Your **Company ID** (\`companyId\`) — found in your Adyen Customer Area under **Settings > Account**.
- An API key with the **Management API — API credentials read and write** role.

> **Tip:** The \`credentialId\` from Step 1 is automatically passed to Steps 2 and 3.
        `);
            },
        },

        "Step 1": {
            name: "List API Credentials",
            stepCallback: async (stepState) => {
                return workflowCtx.showEndpoint({
                    description:
                        "Returns the full list of [API credentials](https://docs.adyen.com/development-resources/api-credentials) " +
                        "configured under your company account.\n\n" +
                        "Enter your **`companyId`** in the path parameter field. " +
                        "After a successful call, the **first credential's ID** from the `data` array is automatically " +
                        "carried forward and pre-filled in Steps 2 and 3.\n\n" +
                        "**Required role:** Management API — API credentials read and write",

                    endpointPermalink:
                        "$e/API%20credentials%20-%20company%20level/listCompanyApiCredentials",
                    args: {
                        companyId: "APIMatic300"
                    },

                    verify: (response, setError) => {
                        if (response?.StatusCode >= 200 && response?.StatusCode < 300) {
                            return true;
                        } else {
                            setError(
                                "Failed to list API credentials. Please check your companyId and API key and try again."
                            );
                            return false;
                        }
                    },
                });
            },
        },

        "Step 2": {
            name: "Check Allowed Origins",
            stepCallback: async (stepState) => {
                const step1 = stepState?.["Step 1"];
                console.log("step state", step1)
                const credentials = step1?.body?.data || step1?.data?.data;
                const firstCredential = credentials?.[0];
                const credentialId = firstCredential?.id;

                // Extract companyId from the _links.self.href on the credential object
                // e.g. "https://.../v3/companies/{companyId}/apiCredentials/{id}"
                const selfHref = firstCredential?._links?.self?.href ?? "";
                const companyMatch = selfHref.match(/companies\/([^/]+)/);
                const companyId = companyMatch?.[1];

                if (!credentialId) {
                    return workflowCtx.showContent(
                        "**Error:** Credential ID not found from Step 1. Please complete Step 1 successfully before proceeding."
                    );
                }

                return workflowCtx.showEndpoint({
                    description:
                        "Returns the list of [allowed origins](https://docs.adyen.com/development-resources/client-side-authentication#allowed-origins) " +
                        `for credential **\`${credentialId}\`** (captured from Step 1).\n\n` +
                        "### What to look for\n\n" +
                        "- **Empty `data` array** → The credential accepts requests from *any* domain. " +
                        "This is a security risk — consider adding specific allowed origins.\n" +
                        "- **Non-empty `data` array** → The credential is domain-restricted. " +
                        "Verify the listed origins are expected and current.\n\n" +
                        "**Required role:** Management API — API credentials read and write",

                    endpointPermalink:
                        "$e/Allowed%20origins%20-%20company%20level/listCompanyApiCredentialOrigins",

                    args: {
                        ...(companyId && { companyId }),
                        apiCredentialId: credentialId,
                    },

                    verify: (response, setError) => {
                        if (response?.StatusCode >= 200 && response?.StatusCode < 300) {
                            return true;
                        } else {
                            setError(
                                "Failed to retrieve allowed origins. Ensure the companyId and apiCredentialId are correct."
                            );
                            return false;
                        }
                    },
                });
            },
        },

        "Step 3": {
            name: "Review Credential Details",
            stepCallback: async (stepState) => {
                const step1 = stepState?.["Step 1"];
                const step2 = stepState?.["Step 2"];

                const credentials = step1?.body?.data || step1?.data?.data;
                const firstCredential = credentials?.[0];
                const credentialId = firstCredential?.id;

                const selfHref = firstCredential?._links?.self?.href ?? "";
                const companyMatch = selfHref.match(/companies\/([^/]+)/);
                const companyId = companyMatch?.[1];

                // Determine restriction status from Step 2's response
                const origins = step2?.body?.data || step2?.data?.data;
                const isUnrestricted = Array.isArray(origins) && origins.length === 0;
                const originChecked = Array.isArray(origins);

                const securityCallout = originChecked
                    ? isUnrestricted
                        ? "\n\n> ⚠️ **Security Warning:** This credential has **no allowed origins** configured (discovered in Step 2). " +
                        "Any domain can make requests using it. Review its roles below — credentials with broad roles and no " +
                        "origin restrictions represent the highest risk.\n\n"
                        : "\n\n> ✅ **Origin-restricted:** This credential has allowed origins configured (verified in Step 2). " +
                        "Confirm the roles below are appropriately scoped for its intended use.\n\n"
                    : "\n\n";

                if (!credentialId) {
                    return workflowCtx.showContent(
                        "**Error:** Credential ID not found from Step 1. Please complete Step 1 successfully before proceeding."
                    );
                }

                return workflowCtx.showEndpoint({
                    description:
                        "Returns the complete details of credential " +
                        `**\`${credentialId}\`** (captured from Step 1), including its **roles**, **active status**, and **client key**.` +
                        securityCallout +
                        "### What to look for in the response\n\n" +
                        "- **`roles`** — Are they overly broad (e.g. `Management API - All`)? " +
                        "If so, consider creating a scoped credential instead.\n" +
                        "- **`active`** — Is this credential still actively needed? If not, consider deactivating it.\n" +
                        "- **`clientKey`** — Used for client-side requests. Confirm it is only used in trusted, domain-restricted contexts.\n\n" +
                        "**Required role:** Management API — API credentials read and write",

                    endpointPermalink:
                        "$e/API%20credentials%20-%20company%20level/getCompanyApiCredential",

                    args: {
                        ...(companyId && { companyId }),
                        apiCredentialId: credentialId,
                    },

                    verify: (response, setError) => {
                        if (response?.StatusCode >= 200 && response?.StatusCode < 300) {
                            return true;
                        } else {
                            setError(
                                "Failed to retrieve credential details. Ensure the companyId and apiCredentialId are correct."
                            );
                            return false;
                        }
                    },
                });
            },
        },
    };
}