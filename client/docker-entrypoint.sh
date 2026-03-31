#!/bin/sh
# Vervang de API URL in env.js met de waarde uit de omgevingsvariabele
cat <<EOF > /usr/share/nginx/html/assets/env.js
(function (window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = '${API_URL:-http://localhost:3000}';
}(this));
EOF

exec nginx -g 'daemon off;'
