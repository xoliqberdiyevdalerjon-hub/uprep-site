// Lint config for the feedback relay code: `npx eslint@9 cloudflare-worker assets/feedback.js assets/relay-config.js`
const browser = { window: "readonly", document: "readonly", navigator: "readonly", location: "readonly", localStorage: "readonly", fetch: "readonly", AbortController: "readonly", setTimeout: "readonly", clearTimeout: "readonly", globalThis: "readonly", Promise: "readonly", JSON: "readonly" };
const worker = { Response: "readonly", Request: "readonly", Headers: "readonly", fetch: "readonly", crypto: "readonly", TextEncoder: "readonly", AbortSignal: "readonly", Intl: "readonly", URL: "readonly", process: "readonly", globalThis: "readonly" };
const rules = {
  "no-undef": "error", "no-unused-vars": ["error", { args: "none", caughtErrors: "none" }], "no-redeclare": "error", "no-dupe-keys": "error",
  "no-unreachable": "error", "eqeqeq": ["error", "smart"], "no-implicit-globals": "off", "no-var": "off", "no-empty": ["error", { allowEmptyCatch: true }],
  "no-control-regex": "off", "no-misleading-character-class": "error", "no-useless-escape": "error", "no-constant-condition": "error", "use-isnan": "error", "valid-typeof": "error"
};
export default [
  { files: ["cloudflare-worker/**/*.js", "cloudflare-worker/**/*.mjs"], languageOptions: { ecmaVersion: 2022, sourceType: "module", globals: worker }, rules },
  { files: ["assets/feedback.js", "assets/relay-config.js"], languageOptions: { ecmaVersion: 2017, sourceType: "script", globals: browser }, rules },
];
