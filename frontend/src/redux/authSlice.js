import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl);

// user registration
export  const registerUser = createAsyncThunk("auth/registerUser",async (payload, { rejectWithValue }) => {

    console.log("payload")
    console.log(payload)
    try {
        const resposne = await axios.post(`${apiUrl}auth/user/register`, payload,{withCredentials:true})

        return {
            status: resposne.status,
            data: resposne.data
        }

    } catch (error) {

        return rejectWithValue({
            status: error.status,
            data: error.response.data
        })
    }
})

// user login
export  const userLogin = createAsyncThunk("auth/userLogin",async (payload, { rejectWithValue }) => {
    try {
        const resposne = await axios.post(`${apiUrl}auth/user/login`, payload,{withCredentials:true})

        return {
            status: resposne.status,
            data: resposne.data
        }

    } catch (error) {

        return rejectWithValue({
            status: error.status,
            data: error.response.data
        })
    }
})

// food partner registration

export  const foodPartnerRegistration = createAsyncThunk("auth/foodPartnerRegistration",async (payload, { rejectWithValue }) => {

    console.log("payload")
    console.log(payload)
    try {
        const resposne = await axios.post(`${apiUrl}auth/food-partner/register`, payload,{withCredentials:true})

        return {
            status: resposne.status,
            data: resposne.data
        }

    } catch (error) {

        return rejectWithValue({
            status: error.status,
            data: error.response.data
        })
    }
})

// food partner login

export  const foodPartnerLogin = createAsyncThunk("auth/foodPartnerLogin",async (payload, { rejectWithValue }) => {
    try {
        const resposne = await axios.post(`${apiUrl}auth/food-partner/login`, payload,{withCredentials:true})

        return {
            status: resposne.status,
            data: resposne.data
        }

    } catch (error) {

        return rejectWithValue({
            status: error.status,
            data: error.response.data
        })
    }
})



const initialState = {
    isLoading: false
}
const AuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(registerUser.rejected, (state) => {
            state.isLoading = false
        })

         .addCase(userLogin.pending, (state, action) => {
            state.isLoading = true
        }).addCase(userLogin.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(userLogin.rejected, (state) => {
            state.isLoading = false
        })

        .addCase(foodPartnerRegistration.pending, (state, action) => {
            state.isLoading = true
        }).addCase(foodPartnerRegistration.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(foodPartnerRegistration.rejected, (state) => {
            state.isLoading = false
        })
                .addCase(foodPartnerLogin.pending, (state, action) => {
            state.isLoading = true
        }).addCase(foodPartnerLogin.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(foodPartnerLogin.rejected, (state) => {
            state.isLoading = false
        })
    }
})


export default AuthSlice.reducer