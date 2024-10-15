export const searchFilters = (filterFields:string[], query:any)=>{
    return filterFields.map(field => ({
        [field]: {
          contains: 
            query[field]
            ? query[field]
            : query.searchText,
        },
      })).filter(condition => Object.values(condition)[0].contains !== undefined);
}

// import { UserSearch } from "../controller/user.controller";

// export const searchFilters = (filterFields:string[], query:UserSearch)=>{
//     return filterFields.map(field => ({
//         [field]: {
//           contains: query.searchText
//         },
//       }));
// }