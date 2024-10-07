const shuffle = (items) => {
  const mixedItems = [...items];

  for (let i = mixedItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixedItems[i], mixedItems[j]] = [mixedItems[j], mixedItems[i]];
  }

  return mixedItems;
};

const adaptPointToClient = (point) => ({
  ...point,
  dateFrom: new Date(point.dateFrom),
  dateTo: new Date(point.dateTo),
});

export { shuffle, adaptPointToClient };
