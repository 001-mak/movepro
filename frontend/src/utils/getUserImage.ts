// import { getApiCall } from '../services/api-service';
// import { useSelector } from 'react-redux';

// const baseURL = import.meta.env.VITE_API_BASE_URL;

// export const getUserImage = () => {
//   const pictureURL = getImgUrl()
//   return pictureURL
// };

// async function getImgUrl() {
//   const userState = useSelector((state: any) => state.auth.user);
//   let picture: string = baseURL +`/uploads/user.png`; // Default picture

//   await getApiCall(`/users/${userState.id}`)
//     .then((res) => {
//       const user = res.data;
//       if (user.picture && user.picture !== '') {
//       picture = baseURL + `/uploads/${user.picture}`;
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   return picture;
// }


import { getApiCall } from '../services/api-service';

export const getUserImage = async (id:string) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  let picture = baseURL + `/uploads/user.png`; // Default picture

  await getApiCall(`/users/${id}`)
    .then((res) => {
      const user = res.data;
      if (user.picture && user.picture !== '') {
        picture = baseURL + `/uploads/${user.picture}`;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return picture;
};