export const getSpellFilterList = (levelsArray) => {
  let levelCache = {};
  let output = [];
  levelsArray.forEach((level) => {
    let key = level.level;
    if (!levelCache[key]) {
      levelCache[key] = true;
      output.push(level);
    }
  });

  return output.sort((a, b) => a.level - b.level);
};
