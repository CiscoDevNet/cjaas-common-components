# Webex Walkin Component

## How to Use
##### 1. Add the following to the highest level html file within `<head>` within your application. (ex. index.html)
```
  <!-- dependencies for webexWalkin component -->
  <script
    type="module"
    src="https://cj.exp.bz/event-listener/ref-cjaas-requests.js"
  ></script>
  <script
    type="module"
    src="https://unpkg.com/webex/umd/webex.min.js"
  ></script>
```
##### 2. Fetch a temporary access token for this component (expires after 15 minutes)
<sub>At this time, the only way to fetch an access token for this component is to navigate to following link<sub>

[https://cjaas-webex-bot.azurewebsites.net/api/guest-access?name=venki](https://cjaas-webex-bot.azurewebsites.net/api/guest-access?name=venki)

##### 3. Pass this access token into the `access-token` property of this component.
<sub>This access token you received pairs with the following brand-name and agent-id<sub>
```
    <cjaas-webex-walkin
      access-token="<your-access-token>"
      brand-name="venki"
      agent-id="v3nki@cisco.com"
    >
    </cjaas-webex-walkin>
```

## Localization

By default, if the server connection fails the component will render the message "Unable to connect to server", but this can be easily replaced with Localized text content using the named slot `"l10n-no-connect-message"`.

```html
<cjaas-webex-walkin access-token=${accessToken} brand-name="example" agent-id="example@cisco.com">
  <span slot="l10n-no-connect-message">No se puede conectar al servidor</span>
</cjaas-webex-walkin>
```

## Named Slots
In addition to the Localization slot detailed above, you can provide a custom card title.
```html
<cjaas-webex-walkin access-token=${accessToken} brand-name="example" agent-id="example@cisco.com">
  <div slot="card-title">MY OWN WEBEX NAME</div>
</cjaas-webex-walkin>
```


## Copyright

Copyright (c) 2021 Cisco Systems

