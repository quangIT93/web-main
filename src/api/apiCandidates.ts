import axiosClient from './axiosClient'
// api/productApi.js

const candidateSearch = {
  getAcademicTypes: (lang: string) => {
    const URL = `/v3/academic-types?lang=${lang}`
    return axiosClient.get(URL)
  },


  getCandidates: (addresses: any, categories: any, educations: number | undefined, gender: number, ageMin: number| null, ageMax: number| null, limit: number | null, page: number | null, lang: string) => {
    console.log(educations);
    
    const URL = `/v3/cv-filter/search?` +
      `${addresses.length !== 0
        ? `&${addresses?.map((n: any, index: number) => `addresses=${n[1]}`).join('&')}`
        : ``
      }` +
      `${categories.length !== 0
        ? `&${categories?.map((n: any, index: number) => `categories=${n[1]}`).join('&')}`
        : ``
      }` +
      // `${educations.length !== 0
      //   ? `&${educations?.map((n: any, index: number) => `educations=${n}`).join('&')}`
      //   : ``
      // }`
      `${educations ? `&educations=${educations}`: ``}` +
      `&${gender === 0? `gender=${0}` : gender !== 0 ? `gender=${1}`: ``}` +
      `&${ageMin ? `ageMin=${ageMin}` : ``}` +
      `&${ageMax ? `ageMax=${ageMax}` : ``}` +
      `&${limit ? `limit=${limit}` : ``}` +
      `&${page ? `page=${page}` : ``}` +
      `&${lang ? `lang=${lang}` : ``}`;
      return axiosClient.get(URL)
  },

  postBookmarkCandidate: (accountId: string) => {
    const URL = `/v3/candidate-bookmarks`
    return axiosClient.post(
      URL,
      { candidateId: accountId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    )
  },
  getBookmarkCandidate: (lang: string) => {
    const URL = `/v3/candidate-bookmarks?lang=${lang}`
    return axiosClient.get(URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
},

}

export default candidateSearch
