type GroupedData<T> = { key: string | number; values: T[] }[];

export function groupBy<T>(data: T[], keyGetter: (item: T) => string | number): GroupedData<T> {
  const groupedData: Record<string | number, T[]> = {};

  data.forEach((item) => {
    const key = keyGetter(item);
    if (!groupedData[key]) {
      groupedData[key] = [];
    }
    groupedData[key].push(item);
  });

  const result: GroupedData<T> = Object.keys(groupedData).map((key) => ({
    key,
    values: groupedData[key],
  }));

  return result;
}
