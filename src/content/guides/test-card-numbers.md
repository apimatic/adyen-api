
# Test Card Numbers

Use our test card numbers to test your integration.

##### Testing POS payments

We provide physical test cards to use with our test payment terminals. For more information, see our [point-of-sale test cards](https://docs.adyen.com/point-of-sale/testing-pos-payments#testing-card-payments).

To test your integration before accepting live payments, use the card details that are provided on this page.

Refer to [Testing your online payments integration](https://docs.adyen.com/development-resources/testing) to learn about the flows we recommend you to test.

## [](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#requirements)Requirements

|Requirement|Description|
|---|---|
|**Integration type**|Use the test cards on this page to test your [online payments](https://docs.adyen.com/online-payments) integration.|
|**Limitations**|-   These test card numbers only work with Adyen's test platform. They do not work on other platforms.
-   If you use [RevenueProtect](https://docs.adyen.com/risk-management), test payments can be blocked if they appear fraudulent. For testing, you can temporarily add the test card and shopper details to a [trust list](https://docs.adyen.com/risk-management/configure-manual-risk/referral-rules).|

## [Tools for testing](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#tools-for-testing)

We provide useful web and Android tools to help you test your integrations.

### [Chrome extension](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#chrome-extension)

Install the [Adyen Test Cards extension from the Chrome Web Store](https://chrome.google.com/webstore/detail/adyen-test-cards/icllkfleeahmemjgoibajcmeoehkeoag) to access our test cards and test your Web Drop-in or Components integration in your browser.

### [Android test cards app](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#android-test-cards-app)

Install the [Adyen Test Cards Android app from GitHub](https://github.com/Adyen/adyen-testcards-android/releases/latest/download/adyen-test-cards.apk) to access our test cards and test your Android Drop-in or Components integration on your Android device.

## [Encrypted card details](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#test-encrypted-card-details)

To test API calls from your server when your client-side integration is not ready yet, add a prefix of `test_` to the test card credentials.

For example, to use the Mastercard test card with card number 5555555555554444, specify the following in your `/payments` request:

```
Copy code{..."paymentMethod": {    "type": "scheme",    "encryptedCardNumber": "test_5555555555554444",    "encryptedExpiryMonth": "test_03",    "encryptedExpiryYear": "test_2030",    "encryptedSecurityCode": "test_737"  }}
```

## [American Express (Amex)](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#american-express-amex)

|Card Number|Issuing Country/region|Expiry Date|CID|
|---|---|---|---|
|3700 0000 0000 002|NL|03/2030|7373|
|3700 0000 0100 018
Security code optional|NL|03/2030|7373|

|Card number|Card type|CVV2/CVC2|Username|Password|Issuing country/region|Expiry date|
|---|---|---|---|---|---|---|
|5127 8809 9999 9990|BCMC / Mastercard Debit|BCMC: None
Mastercard: 737|user|password|BE|03/2030|
|6703 4444 4444 4449|BCMC / Maestro|None|user|password|BE|03/2030|
|4871 0499 9999 9910 [<sup>1</sup>](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#routing)|BCMC / Visa Debit|BCMC: None
Visa: 737|user|password|BE|03/2030|

<sup>1</sup> Depending on your payment method setup, transactions with this test card are routed to Bancontact or Visa.

## [Cartes Bancaires](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#cartes-bancaires)

|Card Number|Card Type|Issuing Country/region|Expiry Date|CVV2/CVC3|
|---|---|---|---|---|
|4360 0000 0100 0005|Cartes Bancaires|FR|03/2030|737|
|4035 5010 0000 0008|Visa|FR|03/2030|737|
|4035 5014 2814 6300|Visa Debit / Cartes Bancaires|FR|03/2030|737|

## [China UnionPay](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#china-unionpay)

**ExpressPay Credit Card** (`cup`)

|Card Number|Expiry Date|CVC|Issuing Country/region|
|---|---|---|---|
|8171 9999 2766 0000|10/2030|737|CN|
|8171 9999 0000 0000 021|10/2030|737|CN|
|6243 0300 0000 0001|12/2029|737|CN|

SMS verification codes:

|Channel|Verification code|
|---|---|
|Mobile|123456|
|Desktop|111111|

## [Dankort](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#dankort)

|Card Number|Card Type|Issuing Country/region|Expiry Date|CVV2/CVC3|
|---|---|---|---|---|
|5019 5555 4444 5555|Dankort|DK|03/2030|737|
|4571 0000 0000 0001|Visa / Dankort|DK|03/2030|737|

## [Diners](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#diners)

|Card Number|Issuing Country/region|Expiry Date|CVV2/CVC3|
|---|---|---|---|
|3600 6666 3333 44|US|03/2030|737|
|3607 0500 0010 20
Security code optional|NL|03/2030|737|

## [Discover](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#discover)

|Card Number|Issuing Country/region|Expiry Date|CVD/CID|
|---|---|---|---|
|6011 6011 6011 6611|US|03/2030|737|
|6445 6445 6445 6445|GB|03/2030|737|

## [Eftpos](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#eftpos)

|Card Number|Card Type|Issuing Country/region|Expiry Date|CVC|
|---|---|---|---|---|
|4687 3801 0001 0006|Mastercard / Eftpos|AU|03/2030|737|

## [Elo](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#elo)

|Card Number|Issuing Country/region|Expiry Date|CVE|
|---|---|---|---|
|5066 9911 1111 1118|BR|03/2030|737|

## [Hipercard](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#hipercard)

|Card Number|Issuing Country/region|Expiry Date|CVV2/CVC3|
|---|---|---|---|
|6062 8288 8866 6688|BR|03/2030|737|

## [JCB](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#jcb)

|Card Number|Card Type|Issuing Country/region|Expiry Date|CVV2/CVC3|
|---|---|---|---|---|
|3569 9900 1009 5841|Consumer|US|03/2030|737|

## [Maestro](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#maestro)

For online Maestro payments, 3D Secure is mandatory. See [Test 3D Secure 2 authentication](https://docs.adyen.com/development-resources/testing/3d-secure-2-authentication).

|Card Number|Issuing Country/region|Expiry Date|CVV2/CVC3|
|---|---|---|---|
|6771 7980 2100 0008|US|03/2030|737|
|6771 7980 2100 0016
Security code optional|US|03/2030|

## [Mastercard](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#mastercard)

|Card Number|Card Type|Issuing Country/region|Expiry Date|CVC3|
|---|---|---|---|---|
|2222 4000 7000 0005|Commercial Debit|CA|03/2030|737|
|5555 3412 4444 1115
Security code optional|Consumer|NL|03/2030|737|
|5577 0000 5577 0004|Consumer|PL|03/2030|737|
|5555 4444 3333 1111|Consumer|GB|03/2030|737|
|2222 4107 4036 0010|Corporate|NL|03/2030|737|
|5555 5555 5555 4444|Credit|GB|03/2030|737|
|2222 4107 0000 0002|Corporate Credit|NL|03/2030|737|
|2222 4000 1000 0008|Credit|CA|03/2030|737|
|2223 0000 4841 0010|Credit|NL|03/2030|737|
|5130 2900 0000 0009|Credit|FR|03/2030|737|
|2222 4000 6000 0007|Debit|CA|03/2030|737|
|2223 5204 4356 0010|Debit|NL|03/2030|737|
|2222 4000 3000 0004|Fleet Credit|CA|03/2030|737|
|5100 0600 0000 0002|Premium Credit|US|12/2029|737|
|2222 4000 5000 0009|Purchasing Credit|CA|03/2030|737|
|5103 2219 1119 9245|Prepaid|BR|03/2030|737|

## [UATP](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#uatp)

|Card Number|Card Type|Expiry Date|CVV2/CVC3|
|---|---|---|---|
|1354 1001 4004 955|UATP|03/2030|None|

## [US Debit](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#us-debit)

|Card Number|Card Type|Issuing Country|Expiry Date|CVV2/CVC3|
|---|---|---|---|---|
|4400 0020 0000 0004|Visa Debit / Accel / STAR / Maestro USA|US|03/30|737|
|4000 0330 0330 0335|Visa Debit / PULSE / NYCE|US|03/30|737|
|5002 5100 0000 0013|Mastercard Debit / Accel / STAR / Maestro USA|US|03/30|737|
|5413 3300 3300 3303|Mastercard Debit / PULSE / NYCE|US|03/30|737|
|6011 6099 0000 0003|Discover Debit / Accel / STAR / Maestro USA|US|03/30|737|
|6445 6450 0000 0002|Discover Debit / PULSE / NYCE|US|03/30|737|

## [Visa](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#visa)

|Card Number|Card Type|Issuing Country/region|Expiry Date|CVV2|
|---|---|---|---|---|
|4111 1111 4555 1142
Security code optional|Classic|NL|03/2030|737|
|4111 1120 1426 7661
eight-digit BIN|Debit|FR|12/2030|737|
|4988 4388 4388 4305|Classic|ES|03/2030|737|
|4166 6766 6766 6746|Classic|NL|03/2030|737|
|4646 4646 4646 4644|Classic|PL|03/2030|737|
|4000 6200 0000 0007|Commercial Credit|US|03/2030|737|
|4000 0600 0000 0006|Commercial Debit|US|03/2030|737|
|4293 1891 0000 0008|Commercial Premium Credit|AU|03/2030|737|
|4988 0800 0000 0000|Commercial Premium Debit|IN|03/2030|737|
|4111 1111 1111 1111|Consumer|NL|03/2030|737|
|4444 3333 2222 1111|Corporate|GB|03/2030|737|
|4001 5900 0000 0001|Corporate Credit|IL|03/2030|737|
|4000 1800 0000 0002|Corporate Debit|IN|03/2030|737|
|4000 0200 0000 0000|Credit|US|03/2030|737|
|4000 1600 0000 0004|Debit|IN|03/2030|737|
|4002 6900 0000 0008|Debit|AU|03/2030|737|
|4400 0000 0000 0008|Debit|US|03/2030|737|
|4484 6000 0000 0004|Fleet Credit|US|03/2030|737|
|4607 0000 0000 0009|Fleet Debit|MX|03/2030|737|
|4977 9494 9494 9497|Gold|FR|03/2030|737|
|4000 6400 0000 0005|Premium Credit|AZ|03/2030|737|
|4003 5500 0000 0003|Premium Credit|TW|03/2030|737|
|4000 7600 0000 0001|Premium Debit|MU|03/2030|737|
|4017 3400 0000 0003|Premium Debit|RU|03/2030|737|
|4005 5190 0000 0006|Purchasing Credit|US|03/2030|737|
|4131 8400 0000 0003|Purchasing Debit|GT|03/2030|737|
|4151 5000 0000 0008|Visa Credit|US|03/2030|737|
|4199 3500 0000 0002|Visa Proprietary|FR|03/2030|737|

## [Visa Electron](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#visa-electron)

|Card Number|Issuing Country/region|Expiry Date|CVV2/CVC3|
|---|---|---|---|
|4001 0200 0000 0009|BR|03/2030|737|

## [V Pay](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#v-pay)

|Card Number|Issuing Country/region|Expiry Date|CVV2/CVC3|
|---|---|---|---|
|4013 2500 0000 0000 006|PL|03/2030|737|

## [3D Secure 2](https://docs.adyen.com/development-resources/test-cards-and-credentials/test-card-numbers#3d-secure-2)

The following cards are enrolled in 3D Secure 2. You can use them to [test 3D Secure 2 authentication scenarios](https://docs.adyen.com/development-resources/testing/3d-secure-2-authentication).

|Card Type|Card Number|Expiry Date|Security Code (CVC/CVV/CID)|
|---|---|---|---|
|American Express|3714 4963 5398 431|03/2030|7373|
|Bancontact / Maestro|6703 4444 4444 4449|03/2030|Not applicable|
|Bancontact / Visa|4871 0499 9999 9910|03/2030|737|
|Cartes Bancaires / Visa Debit|4035 5014 2814 6300|03/2030|737|
|Cartes Bancaires|4360 0000 0100 0005|03/2030|737|
|China UnionPay (Credit)|6250 9470 0000 0014|03/2030|123|
|China UnionPay (Debit)|6250 9460 0000 0016|03/2030|123|
|Diners|3056 9309 0259 04|03/2030|737|
|Discover|6011 1111 1111 1117|03/2030|737|
|JCB / Mastercard|3566 1111 1111 1113|03/2030|737|
|Maestro|5000 5500 0000 0029|03/2030|Not applicable|
|Mastercard|5454 5454 5454 5454|03/2030|737|
|Mastercard Credit|2222 4000 1000 0008|03/2030|737|
|Visa|4917 6100 0000 0000|03/2030|737|
|Visa Classic|4166 6766 6766 6746|03/2030|737|
