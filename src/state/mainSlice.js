import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  paymentAmount: '',
  qrCodeEth: false,
  qrCodeLit: false,
  qrCodeBtc: false,
  notifications: [],
  openSidebar: true
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    NO_WITHDRAWAL_ACCESS: (state, action) =>
      (state.withdrawalAccessPopUp = action.payload),

    handleSidebar: (state, action) => {

     state.openSidebar = !state.openSidebar
      },

    ACCESS_ERROR: (state, action) => (state.accessCodeError = action.payload),

    ACCESS_SUCCESS: (state, action) =>
      (state.accessCodeSuccess = action.payload),
    PROVE_SUCCESS: (state, action) =>
      (state.accessCodeProveSuccess = action.payload),
    PROVE_ERROR: (state, action) =>
      (state.accessCodeProveSuccess = action.payload),
    NOTIFICATION_SUCCESS: (state, action) =>
      (state.notifications = action.payload),

    PAYMENT_SUCCESS: (state, action) => (state.paymentSuccess = action.payload),
    PAYMENT_ERROR: (state, action) => (state.paymentError = action.payload),

    WITHDRAWAL_ERROR: (state, action) =>
      (state.withdrawalError = action.payload),
    WITHDRAWAL_SUCCESS: (state, action) =>
      (state.withdrawalSuccess = action.payload),
    WITHDRAWAL_DATA: (state, action) => (state.withdrawalData = action.payload),


    PAYMENT_SET_BTC: (state, action) => {
      return (
        (state.paymentAmountData = action.payload.amount),
        (state.qrCodeBtc = action.payload.qrcode),
        (state.qrCodeEth = false),
        (state.qrCodeLit = false)
      )
    },
    PAYMENT_SET_LIT: (state, action) => {
      return (
        (state.paymentAmountData = action.payload.amount),
        (state.qrCodeLit = action.payload.qrcode),
        (state.qrCodeEth = false),
        (state.qrCodeBtc = false)
      )
    },
    PAYMENT_SET_ETH: (state, action) => {
      return (
        (state.paymentAmountData = action.payload.amount),
        (state.qrCodeEth = action.payload.qrcode),
        (state.qrCodeLit = false),
        (state.qrCodeBtc = false)
      )
    },



  }
})

export const {
  ACCESS_ERROR,

  ACCESS_SUCCESS,
  PROVE_SUCCESS,
  PROVE_ERROR,

  PAYMENT_SET_BTC,
  PAYMENT_SET_LIT,
  PAYMENT_SET_ETH,
  handleSidebar
} = appSlice.actions
export default appSlice.reducer