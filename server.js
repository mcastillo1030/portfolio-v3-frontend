// server.js
async function loadServer() {
  const { defaut } = await import("./.output/server/index.mjs");
}
loadServer()