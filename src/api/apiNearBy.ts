import axiosClient from './axiosClient'
// api/productApi.js
const nearByApi = {
  getNearByJob: (
    pvId: any[] | null,
    // pvId: number | null,
    pcid: number | null,
    ccid: number | null,
    limit: Number,
    threshold: Number | null,
    lang: string
  ) => { 
    if (pvId && Array.isArray(pvId)) {
      pvId = [...new Set(pvId)] as string[];
    } else {
      // Handle the case when pvId is null or not an array
      pvId = ['79'];  // Default value when pvId is not usable
    }
    
    const URL = `/v1/posts/nearby?${pvId.map((n: any, index) => `pvid=${n}`).join('&')}&` +
    `${pcid ? `pcid=${pcid}&` : ''}` +
    `${ccid ? `ccid=${ccid}&` : ''}` +
    `limit=${limit}&threshold=${threshold ? threshold : ''}&lang=${lang}`;

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}

export default nearByApi
