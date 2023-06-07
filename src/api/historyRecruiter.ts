import axiosClient from './axiosClient'
// api/productApi.js
const historyRecruiter = {
  getAllPosted: (threshold: number, limit: number) => {
    const URL = `/history/recruiter/posts?threshold=${threshold}&limit=${limit}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
  GetAllApplicationsOfAJob: (
    post_id: number,
    limit: number,
    threshold: number
  ) => {
    const URL = `/history/recruiter/${post_id}/applications?limit=${limit}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
  GetInformationAndCandidatesCount: (threshold: number, limit: number) => {
    const URL = `/history/recruiter/applications?threshold${threshold}&limit=${limit}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
  GetAJobApplication: (post_id: number, application_id: number) => {
    const URL = `/history/recruiter/${post_id}/applications/${application_id}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}
export default historyRecruiter
