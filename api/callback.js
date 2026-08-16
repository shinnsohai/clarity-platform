// Decap CMS OAuth provider — step 2 of 2 (see api/auth.js).
//
// GitHub redirects the popup here with a one-time ?code=. This exchanges that code
// for an access token (server-side, using OAUTH_CLIENT_SECRET, which must never reach
// the browser) and hands the token back to the Decap CMS admin page — which is the
// *opener* window of this popup — via postMessage, using the exact message format
// Decap's github backend listens for.
export default async function handler(req, res) {
  const { code, error, error_description: errorDescription } = req.query

  if (error) {
    res.status(400).send(renderMessage('error', { error, error_description: errorDescription }))
    return
  }
  if (!code) {
    res.status(400).send('Missing ?code from GitHub.')
    return
  }

  const clientId = process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    res.status(500).send('Server is missing OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET environment variables.')
    return
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    })
    const tokenData = await tokenRes.json()

    if (tokenData.error) {
      res.status(400).send(renderMessage('error', tokenData))
      return
    }

    res.status(200).send(renderMessage('success', { token: tokenData.access_token, provider: 'github' }))
  } catch (err) {
    res.status(500).send(renderMessage('error', { error: 'token_exchange_failed', error_description: String(err) }))
  }
}

function renderMessage(status, payload) {
  const safeJson = JSON.stringify(payload).replace(/</g, '\\u003c')
  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage() {
          window.opener.postMessage(
            'authorization:github:${status}:${safeJson}',
            '*'
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`
}
