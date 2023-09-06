import { ActionType, ProfileType } from "../../types"
// import { AxiosResponse } from "axios"

const initialState: any = {
    data: {}
};
const profileReducer = (state = initialState, { type, payload }: ProfileType) => {
    switch (type) {
        case ActionType.GET_PROFILE_USER:
            return payload.profile;

        default:
            return state;
    }
};   

export default profileReducer