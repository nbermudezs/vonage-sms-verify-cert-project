## Showcase of Vonage SMS and Verify APIs

To run this project locally run
```
yarn
VIRTUAL_NUMBER=your-vonage-number yarn dev
```
where `VIRTUAL_NUMBER` is the number you purchased from the Vonage Dashboard.

Next, update `lib/nexmoClient.js` with your API key and secret.

Then start a proxy session with `ngrok` using `ngrok http 3000`, then go to your Vonage Dashboard and update the inbound SMS webhook for your virtual number to point
to `/webhooks/inbound-sms`.

This implementation is focused on a very happy path and you should not expect it to fail gracefully in many scenarios. 
The implementation relies on a `displayName` in order to avoid any use of phone numbers in the front-end after registration.
For a happy path scenario follow these steps:
- Open localhost:3000 and register by entering your phone number (https://developer.nexmo.com/concepts/guides/glossary#number-format) and a display name (e.g. userA)
- Enter the verification code you will receive on your phone
- Register using a different phone number and display name (e.g. userB)
- Visit localhost:3000/users?displayName=userB and click on the chat button next to userA
- See the magic happen on your phone(s) as you chat with userA with an anonymous phone number
