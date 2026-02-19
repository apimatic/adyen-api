# Get API credentials

Generate credentials to authenticate the API requests that you make to Adyen.

Each API request that you make to Adyen is processed through an API credential linked to your [company account](https://docs.adyen.com/account/account-structure). For an API request to be successful, you must:

-   Generate an [API key](https://docs.adyen.com/development-resources/api-credentials#generate-api-key) or [basic authentication username and password](https://docs.adyen.com/development-resources/api-credentials#basic-authentication).
-   Have the required [API permissions](https://docs.adyen.com/development-resources/api-credentials#api-permissions).
-   [Authenticate your API requests](https://docs.adyen.com/development-resources/api-authentication).

When your account is set up it has one API credential, you can also create [multiple API credentials](https://docs.adyen.com/development-resources/api-credentials#multiple-credentials) for increased security.

## [Generate an API key](https://docs.adyen.com/development-resources/api-credentials#generate-api-key)

Use the API key to [authenticate your request](https://docs.adyen.com/development-resources/api-authentication#api-key-authentication).

To generate an API key, you must have one of the following [user roles](https://docs.adyen.com/account/user-roles):

-   Merchant admin role
-   Manage API credentials

To generate your API key:

1.  Log in to your [Customer Area](https://ca-test.adyen.com/).
2.  Go to **Developers** > **API credentials**, and select the API credential username for your integration, for example **ws@Company.\[YourCompanyAccount\]**.
3.  Under **Server settings** > **Authentication** select the **API key** tab.
4.  Select **Generate API key**.
5.  Select the copy icon and store your API key securely in your system.
6.  Select **Save changes**.

When you switch to your live environment, you must generate a new API key in your [live Customer Area](https://ca-live.adyen.com/).

## [Manage API permissions](https://docs.adyen.com/development-resources/api-credentials#api-permissions)

You can manage the permissions of an API credential by:

-   Assigning [roles](https://docs.adyen.com/development-resources/api-credentials/roles).
-   Controlling access to merchant accounts.

To change the permissions of an API credential:

1.  Log in to your [Customer Area](https://ca-test.adyen.com/).
2.  Go to **Developers** > **API credentials**, and select the credential username you want to manage permissions for, for example **ws@Company.\[YourCompanyAccount\]**.
3.  Under **Roles and Associated Accounts**, select **Roles**.
4.  Use the search bar to find roles or open the categories to see lists of available roles.
5.  Select which roles to give to the API credential.
6.  Under **Accounts**, select the accounts the credential can access.
7.  Select **Save changes**.

## [Change your API key](https://docs.adyen.com/development-resources/api-credentials#changing-the-api-key)

To change your API key, follow the steps to [generate an API key](https://docs.adyen.com/development-resources/api-credentials#generate-api-key).

When you generate a new API key, it can be used immediately. The old key will still work for 24 hours, allowing you to update your systems with the new key.

### [Extend the time you can use the old API key](https://docs.adyen.com/development-resources/api-credentials#extend-api-key)

To extend the time you can use the old API key:

1.  Log in to your [Customer Area](https://ca-test.adyen.com/).
2.  Go to **Developers** > **API credentials**, and select the credential username for your integration, for example **ws@Company.\[YourCompanyAccount\]**.
3.  Under **Server settings** > **Authentication** select the **API key** tab.
4.  Under **Expiring keys**, you can see how long you have left until the old key expires. Select the reset icon to reset the expiry to 24 hours. Select the expire now icon to expire the old key immediately.
5.  Select **Save changes**.

## [Deactivate your API key](https://docs.adyen.com/development-resources/api-credentials#deactivate-your-api-key)

Webservice users cannot be deleted, however you can deactivate users to prevent their API keys from being used. To deactivate an API key:

1.  Log in to your [Customer Area](https://ca-test.adyen.com/).
2.  Go to **Developers** > **API credentials**, and select the credential username for your integration, for example **ws@Company.\[YourCompanyAccount\]**.
3.  Under **General Settings** use the toggle to switch the webservice user to **Inactive**.
4.  Select **Save changes**.

This change takes effect immediately and will prevent the webservice user from processing API requests. You can switch it back to **Active** at any time to allow API requests again.

## [Generate a basic authentication password](https://docs.adyen.com/development-resources/api-credentials#basic-authentication)

If you are using [basic authentication](https://docs.adyen.com/development-resources/api-authentication#using-basic-authentication) to authenticate your API requests, you can generate a basic authentication password:

1.  Log in to your [Customer Area](https://ca-test.adyen.com/), and go to **Developers** > **API credentials**.
    
    This opens a list with all API credentials linked to your company account.
2.  Select the credential username you want to generate the password for.
3.  Under **Server settings** > **Authentication**, select the **Basic auth** tab.
4.  Select **Generate password**.
5.  Select the copy icon and store your basic authentication password securely in your system.
6.  Select **Save changes**.

If you generate a new basic authentication password, the old password stops working immediately.

Unlike with the API key, there is no overlap period when you can use both the old and the new basic authentication password.

When you switch to your live environment, use the basic authentication credentials from your [live Customer Area](https://ca-live.adyen.com/).

Instead of generating a new password, you can [create a new API credential](https://docs.adyen.com/development-resources/api-credentials#new-credential). This will let you use both your existing password and a new one until you have updated your systems.

## [Add allowed IP range](https://docs.adyen.com/development-resources/api-credentials#add-allowed-ip-range)

As a security measure, you can add allowed IP addresses to your API credential.

When you add an allowed IP range, only requests originating from that range will be permitted.

To add allowed IP addresses:

1.  Log in to your [Customer Area](https://ca-test.adyen.com/).
2.  Go to **Developers** > **API credentials**, and select the credential username for your integration, for example **ws@Company.\[YourCompanyAccount\]**.
3.  Under **Server settings**, select **Allowed IP range**.
4.  Add IP addresses that you want to allow access from.
5.  Select **Save changes**.

## [Multiple API credentials](https://docs.adyen.com/development-resources/api-credentials#multiple-credentials)

When choosing whether to create multiple API credentials, there are trade-offs to consider. Having fewer credentials minimizes the number of API keys you need to handle, while having more gives you better control over API permissions, increasing security. For example:

-   If you have both an online sales channel and a point-of-sale sales channel, we strongly recommend creating a separate API credential for each channel.
-   If you are doing [unreferenced refunds](https://docs.adyen.com/online-payments/classic-integrations/modify-payments/refund#unreferenced-refund) for online payments, we strongly recommend creating a separate credential for processing these refunds.
-   If you have an ecommerce system and a shipping system, you can separate the permissions for initiating and capturing payments.

Some merchants also choose to create separate API credentials for **different legal entities** or **different websites**. These are just some considerations to take into account, the number of API credentials is ultimately up to you.

### [Create an API credential](https://docs.adyen.com/development-resources/api-credentials#new-credential)

To be able to create API credentials, you must have one of the following [user roles](https://docs.adyen.com/account/user-roles):

-   Merchant admin
-   Manage API credentials

To create a new API credential:

1.  Log in to your [Customer Area](https://ca-test.adyen.com/), and go to **Developers** > **API credentials**.
    
    This opens a list with all API credentials linked to your company account.
2.  Select **Create new credential**.
3.  Under **Credential type**, select **Web service user**. You can add a description for the credential here.
4.  Select **Create credential**.
5.  To generate an API key select the **API key** tab under **Server settings** > **Authentication**. Select **Generate API key**, copy the API key using the copy icon and store your API key securely in your system.
6.  If you need a basic authentication password, select the **Basic auth** tab under **Server settings** > **Authentication**. Select **Generate password**, copy the password using the copy icon and store your password securely in your system.
7.  Select **Save changes**.

## [See also](https://docs.adyen.com/development-resources/api-credentials#see-also)

-   [Online payments](https://docs.adyen.com/online-payments)
-   [In-person payments](https://docs.adyen.com/point-of-sale)
-   [PCI DSS compliance guide](https://docs.adyen.com/development-resources/pci-dss-compliance-guide)
-   [Client-side authentication](https://docs.adyen.com/development-resources/client-side-authentication)