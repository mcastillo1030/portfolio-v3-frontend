const broadcastPagination = () => {
  const event = new Event('listing-paginate');
  document.dispatchEvent(event);
};

export default broadcastPagination;