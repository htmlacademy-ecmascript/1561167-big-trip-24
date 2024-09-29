const shuffle = (items) => {
  const mixedItems = [...items];

  for (let i = mixedItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixedItems[i], mixedItems[j]] = [mixedItems[j], mixedItems[i]];
  }

  return mixedItems;
};

const updateItem = (items, update) =>
  items.map((item) => (item.id === update.id ? update : item));

export { shuffle, updateItem };
