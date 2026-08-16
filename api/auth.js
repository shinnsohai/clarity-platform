// Decap CMS OAuth provider — step 1 of 2 (see api/callback.js).
//
// Decap's "github" backend opens a popup pointed at {base_url}/{auth_endpoint}
// (configured in public/admin/config.yml). This endpoint's only job is to redirect
// that popup into GitHub's own OAuth consent screen.
//
// Requires two Vercel project environment variables (Project → Settings →
// Environment Variables): OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET, from a GitHub
// OAuth App (github.com/settings/developers → New OAuth App) whose "Authorization
// callback URL" is set to https://<your-deployed-domain>/api/callback.
export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID

  if (!clientId) {
    res.status(500).send('Server is missing the OAUTH_CLIENT_ID environment variable.')
    return
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host
  const protocol = req.headers['x-forwarded-proto'] || 'https'
  const redirectUri = `${protocol}://${host}/api/callback`
  const scope = process.env.OAUTH_GITHUB_SCOPE || 'repo,user'
  const state = Math.random().toString(36).slice(2)

  const authorizeUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&state=${encodeURIComponent(state)}`

  res.writeHead(302, { Location: authorizeUrl })
  res.end()
}
