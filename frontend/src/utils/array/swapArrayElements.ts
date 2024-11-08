const swapArrayElements = <T>(arr: T[], indexA: number, indexB: number) => {
  const newArr = [...arr];
  [newArr[indexA], newArr[indexB]] = [newArr[indexB], newArr[indexA]];
  return newArr;
};

export default swapArrayElements;
