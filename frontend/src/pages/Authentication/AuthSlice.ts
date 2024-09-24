import { createSlice } from '@reduxjs/toolkit'


const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

let user = null;
if (localStorage?.getItem("user") != null)
    user = JSON.parse(localStorage?.getItem("user") ?? "{}");
let token = "";
if (localStorage?.getItem("access_token") != null)
    token = localStorage?.getItem("access_token") ?? "";
const decodedJwt = parseJwt(token);

  if(user && decodedJwt){
    user.role = decodedJwt.role;
  }
const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
            state.isLoggedIn = false;
            state.user = null;
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer;