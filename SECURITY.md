# Security Policy

## Reporting a vulnerability

FitFeky takes security seriously. If you discover a security issue, please
report it privately — do **not** open a public issue.

**Email:** hello@fitfeky.com

Please include:

- A description of the vulnerability and its impact
- Steps to reproduce
- Affected versions / routes if known

You'll receive an acknowledgment within 3 business days, and we'll keep you
informed as the issue is triaged and fixed.

## Supported versions

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |

## Security considerations for this project

- **API keys** (`GEMINI_API_KEY`, `GOOGLE_API_KEY`) are server-side only and
  must never be exposed to the client. They're read from `process.env` in API
  routes.
- **Client config** (`NEXT_PUBLIC_*`) is intentionally public — never place
  secrets in `NEXT_PUBLIC_*` variables.
- **Affiliate links** use `rel="sponsored nofollow noopener noreferrer"` per
  FTC/Amazon requirements.
- **User data**: the quiz stores answers in the user's `localStorage` — no
  personal data is transmitted to FitFeky servers.