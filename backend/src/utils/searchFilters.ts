export const searchFilters = (filterFields: string[], query: any) => {
  const searchText = query.searchText as string;
  const Clientfilters = (query.searchFilters as string)?.split(",");

  
  if (searchText && query.searchFilters) {
    // Validate and Filter out unnecessary search fields
    const validFielters = Clientfilters.filter((filter) =>
      filterFields.includes(filter)
    );
    return validFielters.map((field) => ({
      [field]: { contains: searchText },
    }));
  }
  if (searchText && !query.searchFilters) {
    return filterFields
      .map((field) => ({
        [field]: {
          contains: query.searchText,
        },
      }))
      .filter(
        (condition) => Object.values(condition)[0].contains !== undefined
      );
  }
  else return undefined;
};
