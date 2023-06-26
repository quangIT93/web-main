import { ActionType, LocationTypes } from '../types'

const initialState = null
export default (state = initialState, { type, payload }: LocationTypes) => {
  switch (type) {
    case ActionType.SET_PROVINCE:
      return payload.province

    default:
      return state
  }
}
