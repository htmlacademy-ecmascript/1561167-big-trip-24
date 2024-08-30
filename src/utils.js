const shuffle = (array) => {
  const mixedArray = [...array];
  for (let i = mixedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixedArray[i], mixedArray[j]] = [mixedArray[j], mixedArray[i]];
  }

  return mixedArray;
};

export { shuffle };
