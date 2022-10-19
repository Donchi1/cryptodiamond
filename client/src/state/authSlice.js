import { createSlice } from '@reduxjs/toolkit'

const initialAuth = {
  loginError: '',
  loginSuccess: '',
  logout: '',
  signupSuccess: '',
  signupError: '',
  passResetSuccess: '',
  passResetError: '',
  passError: '',
  userData: {},
  profileMessage: '',
  passwordMessage: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  reducers: {
    profileUploadSuccess: (state, action) =>
      (state.profileMessage = action.payload),
    passwordUpdateSuccess: (state, action) =>
      (state.passwordMessage = action.payload),
    loginSuccess: (state, action) => (state.loginSuccess = action.payload),
    getUser: (state, action) => (state.userData = action.user),
    passResetSuccess: (state, action) =>
      (state.passResetSuccess = 'A password reset email has been sent to you'),
    passResetError: (state, action) => (state.passResetError = action.payload),
  },
})

export const {

  getUser
  
} = authSlice.actions
export default authSlice.reducer
