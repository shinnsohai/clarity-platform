import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Serves public/admin/index.html at /admin and /admin/ in dev — Vite's dev server
// otherwise falls through to the SPA index.html for any path without a literal
// filename, which would hand /admin to React Router instead of the Decap CMS page.
function adminRoute() {
  return {
    name: 'admin-route',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/admin' || req.url === '/admin/') {
          req.url = '/admin/index.html'
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), adminRoute()],
})
