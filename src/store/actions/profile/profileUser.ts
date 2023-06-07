import { ActionType } from "../../types";


export const setProfileUser = (data: any) => ({
    type: ActionType.GET_PROFILE_USER,
    payload: {
        profile: data,
    }
});




