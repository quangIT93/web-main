import axiosClient from './axiosClient';
// api/productApi.js

const nearByApi = {
  getNearByJob: (
    pvId: any[] | null,
    // pvId: number | null,
    pcid: number | null,
    ccid: number | null,
    limit: Number,
    threshold: Number | null,
    lang: string,
  ) => {
    if (pvId && Array.isArray(pvId)) {
      pvId = [...new Set(pvId)] as string[];
    } else {
      // Handle the case when pvId is null or not an array
      pvId = ['79']; // Default value when pvId is not usable
    }

    const URL =
      `/v1/posts/nearby?${pvId
        .map((n: any, index) => `pvid=${n}`)
        .join('&')}&` +
      `${pcid ? `pcid=${pcid}&` : ''}` +
      `${ccid ? `ccid=${ccid}&` : ''}` +
      `limit=${limit}&threshold=${threshold ? threshold : ''}&lang=${lang}`;

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
  getNearByJobV3: (
    pvId: any[] | null,
    // pvId: number | null,
    pcid: number | null,
    ccid: number | null,
    limit: Number,
    page: Number | null,
    lang: string,
  ) => {
    if (pvId && Array.isArray(pvId)) {
      pvId = [...new Set(pvId)] as string[];
    } else {
      // Handle the case when pvId is null or not an array
      pvId = ['79']; // Default value when pvId is not usable
    }
    console.log('page', page);

    const URL =
      `/v3/posts/nearby?${pvId
        .map((n: any, index) => `provinceId=${n}`)
        .join('&')}&` +
      `${pcid ? `parentCategoryId=${pcid}&` : ''}` +
      `${ccid ? `childrenCategoryId=${ccid}&` : ''}` +
      `limit=${limit}&page=${page || page === 0 ? page : ''}&lang=${lang}`;

    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
};

export default nearByApi;
