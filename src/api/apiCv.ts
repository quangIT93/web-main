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
    putProfileLanguage: (languageLevelId: number, languageName: string, id: number | null) => {
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
    putProfileSkill: (skillLevelId: number, skillName: string, id: number | null) => {
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

    deleteProfileHobbies: () => {
        const URL = `/v3/profiles-hobbies`
        return axiosClient.delete(
            URL,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    // 'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    // reference
    postProfileReference: (fullName: string, phone: string, email: string, description: string) => {
        const URL = `/v3/profiles-references`
        return axiosClient.post(
            URL,
            {
                fullName,
                phone,
                email,
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
    deleteProfileReference: (ids: number[]) => {
        const URL = `/v3/profiles-references/remove`
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
    putProfileReference: (fullName: string, phone: string, email: string, description: string,id: number | null) => {
        const URL = `/v3/profiles-references/${id}`
        return axiosClient.put(
            URL,
            {
                fullName,
                phone,
                email,
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
    deleteProfileAwards: (ids: number[] | null) => {
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

    postCv: (formData: any) => {
        const URL = `/v3/profiles-cvs`
      return axiosClient.post(
            URL,
                formData
            ,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
    },

    // ----------------------------------------------------
    // get theme
    getThemeCv: () => {
        const URL = `/v3/cv-template`;
        return axiosClient.get(
            URL,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        
                },
            }
        )

    },
    putThemeCv: (id: number | null, status: number ) => {
        const URL = `/v3/profiles-cvs/${id}`;
        return axiosClient.put(
            URL
            ,
            {}
            ,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        
                },
            }
        )

    },
    deleteCvById: (ids: number[] | null) => {
    
        
        const URL = `/v3/profiles-cvs`
        return axiosClient.delete(
            URL,
            {
                data: { ids },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }

            }
        )
    },
}

export default apiCv
