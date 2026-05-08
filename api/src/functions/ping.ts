export const handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 404 }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ok: true,
      source: 'cedar-vercel-node24-repro',
      node: process.version,
      timestamp: new Date().toISOString(),
    }),
  }
}
