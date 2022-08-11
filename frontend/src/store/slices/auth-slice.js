// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';
import authConfig from 'src/configs/auth';
import { getCookies, setCookies } from '../actions/cookie-actions';


// ** Fetch Authentication
export const fetchAuth = createAsyncThunk('authSlice/fetchAuth', async () => {
    const storedToken = getCookies()

    if (!storedToken) throw new Error('No Token Found');


    const response = await axios
        .get(authConfig.meEndpoint, {
            headers: {
                Authorization: storedToken
            }
        })
    return response.data.userData
})

// ** Login
export const handleLogin = createAsyncThunk('authSlice/handleLogin', async ({ email, password, errorCallback }, { dispatch }) => {
    try {
        const res = await axios.post('http://localhost:8000/api/signin', { email, password });
        setCookies(res.data.accessToken);
    
        dispatch(fetchAuth())
    }catch(err){
        errorCallback?.(err)
    }
})

export const handleRegister = async ({ email, password, errorCallback }) => {
    try {
        const res = await axios.post('http://localhost:8000/api/signup', { email, password });
        if (res.data.error) {
            errorCallback?.(res.data.error)
        }
    } catch (err) {
        errorCallback?.(err)
    }
}



/* =====================>State<==================== */
const initialState = {
    user: null,
    loading: false,
    isInitialized: false
}


function extraReducers(builder) {
    builder.addCase(fetchAuth.pending, (state, action) => {
        return {
            ...state,
            loading: true,
            isInitialized: true
        }
    })
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
        return {
            ...state,
            loading: false,
            user: action.payload
        }
    })
    builder.addCase(fetchAuth.rejected, (state, action) => {
        return {
            ...state,
            loading: false,
            isInitialized: false
        }
    })
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
        setUser: (state, action) => ({
            ...state,
            user: action.payload
        })
    },
    extraReducers
})


export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer
