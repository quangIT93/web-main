import axiosClient from './axiosClient'
// api/productApi.js
import { FormCompanyValues } from 'pages/Company'


const apiCv = {
    postProfileLanguage: (languageLevelId: number,languageName: string ) => {
        const URL = `/v3/profile-languages`
        return axiosClient.post(
            URL,
            {
                "languageLevelId": languageLevelId,
                "languageName": languageName
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    // 'Content-Type': 'multipart/form-data',
                },
            }
        )
    },
    getProfileLanguage: () => {
        const URL = `/v3/language-types`
        return axiosClient.get(
            URL,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },
    deleteProfileLanguage: (ids: number[]) => {
        const URL = `/v3/profile-languages/remove`
        return axiosClient.delete(
            URL,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                data: { ids },
            
            }
        )
    },
    putProfileLanguage: (languageLevelId: number,languageName: string, id:  number| null  ) => {
        const URL = `/v3/profile-languages/${id}`
        return axiosClient.put(
            URL,
            {
                languageLevelId,
                languageName
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    // 'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    // -----------------------------------------------------------------
    postProfileSkill: (skillLevelId: number,skillName: string ) => {
        const URL = `/v3/profiles-skills`
        return axiosClient.post(
            URL,
            {
                "skillLevelId": skillLevelId,
                "skillName": skillName
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    // 'Content-Type': 'multipart/form-data',
                },
            }
        )
    },
    deleteProfileSkill: (ids: number[]) => {
        const URL = `/v3/profiles-skills/remove`
        return axiosClient.delete(
            URL,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                data: { ids },
            
            }
        )
    },
    putProfileSkill: (skillLevelId: number,skillName: string, id:  number| null  ) => {
        const URL = `/v3/profiles-skills/${id}`
        return axiosClient.put(
            URL,
            {
                skillLevelId,
                skillName
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    // 'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    // ---------------------------------------------------------------- hobbies
    postProfileHobbies: (description: string) => {
        const URL = `/v3/profiles-hobbies`
        return axiosClient.post(
            URL,
            {
                description
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    // 'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    
}

export default apiCv