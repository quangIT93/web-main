import { AuthActionType, LoginPayload } from '../../types'

const initialState = {
  data: {},
}

export default (state = initialState, { type, payload }: LoginPayload) => {
  switch (type) {
    case AuthActionType.LOGIN:
      if (payload) {
        // Thực hiện xác thực tại đây, ví dụ kiểm tra tên người dùng và mật khẩu

        return {
          ...state,
          isLoggedIn: true,
          result: payload.data,
        }
      }
      return state

    default:
      return state
  }
}
