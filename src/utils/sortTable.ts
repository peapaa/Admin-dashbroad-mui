const sortData = <T>(data: T[], order: "asc" | "desc", orderBy: keyof T) => {
  return data.sort((a, b) => {
    let comparisonResult: number;
    if (typeof a[orderBy] === "string" && typeof b[orderBy] === "string") {
      const normalizedA = a[orderBy].toLowerCase().trim();
      const normalizedB = b[orderBy].toLowerCase().trim();
      comparisonResult = normalizedA.localeCompare(normalizedB);
      if (normalizedA === normalizedB) {
        comparisonResult = 0;
      } else {
        comparisonResult = normalizedA.localeCompare(normalizedB);
      }
    } else if (orderBy === "created_at") {
      const dateA = Date.parse(a[orderBy] as string);
      const dateB = Date.parse(b[orderBy] as string);
      comparisonResult = dateA - dateB;
    } else {
      comparisonResult =
        (parseInt(a[orderBy] as string) || 0) -
        (parseInt(b[orderBy] as string) || 0);
    }
    return order === "asc" ? comparisonResult : -comparisonResult;
  });
};

export default sortData;
