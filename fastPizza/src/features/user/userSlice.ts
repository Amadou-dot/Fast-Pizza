import { getAddress } from '../../services/apiGeocoding'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  }) as Promise<GeolocationPosition>
}

export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  // Get the user's geolocation position
  const positionObj = await getPosition()
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  }

  // Then use a reverse geocoding API to get a description of the user's address. The user can correct it if wrong
  const addressObj = await getAddress(position)
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`

  // Then return an object with the data that we are interested in
  return { position, address }
})

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: undefined as string | undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername(state, action) {
      state.username = action.payload
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchAddress.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle'
        state.position = action.payload.position
        state.address = action.payload.address
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      }),
})

export const { updateUsername } = userSlice.actions
export default userSlice.reducer
