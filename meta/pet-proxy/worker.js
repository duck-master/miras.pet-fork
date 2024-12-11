// Define mapping of subdomains to their actual destinations
const SUBDOMAIN_MAP = {
  'monaie.miras.pet': 'monaie.ca',
  'yumidiot.miras.pet': 'vermillion-cassata-7b984f.netlify.app',
  'lynx.miras.pet': 'lynx.rottingroots.com',
  'nyanpasu.miras.pet': 'mira.nyanpasu.dev',
  'gion.miras.pet': 'arimalabs.blog',
  'acetylsalicyl.miras.pet': 'acetylsalicylsaeure.github.io'
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Get the hostname from the request (e.g., "mon.miras.pet")
  const hostname = new URL(request.url).hostname;

  // Look up the destination in our map
  const destination = SUBDOMAIN_MAP[hostname];

  if (!destination) {
    return new Response('Not Found', { status: 404 });
  }

  // Create the new URL using the destination
  const url = new URL(request.url);
  url.hostname = destination;

  // Forward the request
  const response = await fetch(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body
  });

  // Return the response
  return response;
}
