import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL;

// create food

export const createFood = createAsyncThunk("food/createFood", async (payload, { rejectWithValue }) => {
    try {
        const resposne = await axios.post(`${apiUrl}food`, payload, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })

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

// get food

export const getFood = createAsyncThunk("food/get", async (payload, { rejectWithValue }) => {
    try {
        const resposne = await axios.get(`${apiUrl}food`, { withCredentials: true })

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


// get food partner by id
export const getFoodPartnerData = createAsyncThunk("food/getFoodPartnerData", async (id, { rejectWithValue }) => {
    try {
        const resposne = await axios.get(`${apiUrl}food-partner/food-partner/${id}`, { withCredentials: true })

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


// like vid

export const likeFoodReel = createAsyncThunk("food/likeFoodReel", async (payload, { rejectWithValue }) => {
    try {
        const resposne = await axios.post(`${apiUrl}food/like`, payload, {withCredentials: true,})

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
    isLoading: false,
    foodItems: [],
    foodPartnerData: {}
}
const foodSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createFood.pending, (state, action) => {
            state.isLoading = true
        }).addCase(createFood.fulfilled, (state) => {
            state.isLoading = false
        }).addCase(createFood.rejected, (state) => {
            state.isLoading = false
        })


            .addCase(getFood.pending, (state, action) => {
                state.isLoading = true
            }).addCase(getFood.fulfilled, (state, action) => {
                state.isLoading = false
                state.foodItems = action.payload.data.foodItems
            }).addCase(getFood.rejected, (state) => {
                state.isLoading = false
            })

            .addCase(getFoodPartnerData.pending, (state, action) => {
                state.isLoading = true
            }).addCase(getFoodPartnerData.fulfilled, (state, action) => {
                state.isLoading = false
                state.foodPartnerData = action.payload.data.foodpartner
            }).addCase(getFoodPartnerData.rejected, (state) => {
                state.isLoading = false
            })

            .addCase(likeFoodReel.pending, (state, action) => {
            }).addCase(likeFoodReel.fulfilled, (state, action) => {
            }).addCase(likeFoodReel.rejected, (state) => {
            })

    }
})

export default foodSlice.reducer