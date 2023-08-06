import { ActionType, LocationTypes } from '../types'

const initialState = null
 const provincesReducer = (state = initialState, { type, payload }: LocationTypes) => {
  switch (type) {
    case ActionType.SET_PROVINCE:
      return payload.province

    default:
      return state
  }
}

export default provincesReducer
