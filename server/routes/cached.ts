export default cachedEventHandler(async () => {
  return `Response generated at ${new Date().toISOString()}`;
}, {
  swr: true, maxAge: 10
});
