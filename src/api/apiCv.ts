import axiosClient from './axiosClient'
// api/productApi.js
import { FormCompanyValues } from 'pages/Company'


const apiCv = {
    postProfileLanguage: (languageLevelId: number, languageName: string) => {
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
    putProfileLanguage: (ids: number[]) => {
        const URL = `/v3/companies`
        return axiosClient.put(
            URL,
            {
                ids
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
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

    // -----------------------------------------------------------------
    postProfileSkill: (skillLevelId: number, skillName: string) => {
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
    putProifileLanguage: (languageLevelId: number, languageName: string, id: number) => {
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
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    // Profiles Activities -----------------------------------------------------------------
    postProfileActivities: (
        title: string,
        organization: string,
        description: string,
        startDate: number,
        endDate: number,
    ) => {
        const URL = `/v3/profiles-activities`
        return axiosClient.post(
            URL,
            {
                "title": title,
                "organization": organization,
                "description": description,
                "startDate": startDate,
                "endDate": endDate
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
    },
    deleteProfileActivities: (ids: number[]) => {
        const URL = `/v3/profiles-activities/remove`
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
    putProifileActivities: (
        title: string,
        organization: string,
        description: string,
        startDate: number,
        endDate: number,
        id: number) => {
        const URL = `/v3/profiles-activities/${id}`
        return axiosClient.put(
            URL,
            {
                title,
                organization,
                description,
                startDate,
                endDate
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
    },
    // Profiles Awards -----------------------------------------------------------------
    postProfileAwards: (
        title: string,
        description: string,
    ) => {
        const URL = `/v3/profiles-awards`
        return axiosClient.post(
            URL,
            {
                "title": title,
                "description": description,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
    },
    deleteProfileAwards: (ids: number[]) => {
        const URL = `/v3/profiles-awards/remove`
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
    putProifileAwards: (
        title: string,
        description: string,
        id: number) => {
        const URL = `/v3/profiles-awards/${id}`
        return axiosClient.put(
            URL,
            {
                title,
                description,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
    },

}

export default apiCv