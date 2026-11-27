#!/usr/bin/env bash
# Minifies the browser scripts (source stays readable in assets/*.js; the site loads the .min.js files).
# Run after editing assets/app.js or assets/feedback.js:  bash scripts/build_min.sh
set -euo pipefail
cd "$(dirname "$0")/.."
for f in app feedback; do
  npx --yes esbuild@0.24.0 "assets/$f.js" --minify --target=es2017 --charset=utf8 --outfile="assets/$f.min.js" --log-level=warning
done
ls -l assets/*.min.js
