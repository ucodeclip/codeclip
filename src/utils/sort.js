export const tagSort = (array) => {
  const tagSortOrder = (a, b) => {
    a = a.toString().toLowerCase();
    b = b.toString().toLowerCase();
    if (a < b) {
      return -1;
    } else {
      return 1;
    }
  };
  return array.sort(tagSortOrder);
};
