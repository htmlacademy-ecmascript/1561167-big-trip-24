const shuffle = (array, isMixUp = false) => {
  if (!isMixUp) {
    return array;
  }

  const mixUpArray = [...array];
  for (let i = mixUpArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixUpArray[i], mixUpArray[j]] = [mixUpArray[j], mixUpArray[i]];
  }

  return mixUpArray;
};

export { shuffle };
