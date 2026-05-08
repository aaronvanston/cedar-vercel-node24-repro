# Cedar Vercel Node 24 Repro

This is a fresh CedarJS app created with:

```sh
npx create-cedar-app@4.1.0 cedar-vercel-node24-repro --yes --typescript --no-git-init --telemetry false --no-install --node-check false
```

The only intentional app changes are:

- `api/src/functions/ping.ts`: a minimal function that returns JSON.
- `vercel.json`: sets the Vercel build command to `yarn cedar deploy vercel`.
- `.yarnrc.yml`: pins Yarn 4 with `nodeLinker: node-modules`.

The app keeps Cedar's generated Node requirement:

```json
{
  "engines": {
    "node": "=24.x"
  }
}
```

## Repro

Deploy to Vercel with the RedwoodJS framework preset and Node.js 24.x, then call:

```sh
vercel curl /api/ping --deployment <deployment-url> -- --max-time 40 -i
```

This repository is connected to Vercel here:

- Project: `aaron-vanston/cedar-vercel-node24-repro`
- Production URL: https://cedar-vercel-node24-repro.vercel.app
- Deployment URL: https://cedar-vercel-node24-repro-cj92t5cx8-aaron-vanston.vercel.app
- Deployment ID: `dpl_2GAYKLK7kt8zSSRpNpRaPfkop98N`
- Runtime for `api/ping`: `nodejs24.x`

Observed result on Vercel:

```text
curl: (28) Operation timed out after 40005 milliseconds with 0 bytes received
```

Runtime logs show the failure happens inside Vercel's Node bridge before the handler response is returned:

```text
Unhandled Rejection: SyntaxError: Unexpected end of JSON input
    at JSON.parse (<anonymous>)
    at IncomingMessage.<anonymous> (/opt/rust/nodejs.js:2:14238)
```

The generated GraphQL function currently fails separately with Prisma 7 ESM/CommonJS loading:

```text
Error [ERR_REQUIRE_ESM]: require() of ES Module /var/task/api/db/generated/prisma/client.mts from /var/task/api/dist/lib/db.js not supported.
```

The minimal `api/ping` timeout and `/opt/rust/nodejs.js:2:14238` error are the focused reproduction.
