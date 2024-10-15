export const searchFilters = (filterFields:string[], query:any)=>{
    return filterFields.map(field => ({
        [field]: {
          contains: query?.[field]
            ? String(query[field])
            : query?.searchText
            ? String(query.searchText)
            : undefined,
        },
      })).filter(condition => Object.values(condition)[0].contains !== undefined);
}