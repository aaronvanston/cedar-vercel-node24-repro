export const handler = async () => {
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      ok: true,
      source: 'cedar-vercel-node24-repro',
      node: process.version,
      timestamp: new Date().toISOString(),
    }),
  }
}
