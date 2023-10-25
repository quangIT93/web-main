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
    console.log("pvId",[...new Set(pvId)] as string[]);
    console.log("pvId",pvId);
    
    const URL = `/v1/posts/nearby?${pvId && pvId.length > 0 ?
      `${([...new Set(pvId)] as string[])
        ?.map((n: any, index) => `pvid=${n}`).join('&')}&`
      : `pvid=${79}&`}` +
      `${pcid ? `pcid=${pcid}&` : ``}` +
      `${ccid ? `ccid=${ccid}&` : ``}` +
      `limit=${limit}&threshold=${threshold ? threshold : ''}&lang=${lang}`
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  },
}

export default nearByApi
