import axiosClient from './axiosClient';
// api/productApi.js

const apiCompanyV3 = {
  filterCompany: (
    addresses: any,
    categories: any,
    companySizeId: number | undefined,
    limit: number | null,
    page: number | null,
    lang: string,
  ) => {
    const URL =
      `/v3/companies?` +
      `${addresses.length !== 0
        ? `&${addresses
          ?.map((n: any, index: number) => `addresses=${n[1]}`)
          .join('&')}`
        : ``
      }` +
      // `${addresses !== undefined ? `addresses=${addresses}` : ``}` +
      `${categories.length !== 0
        ? `&${categories
          ?.map((n: any, index: number) => `categories=${n[0]}`)
          .join('&')}`
        : ``
      }` +
      `${companySizeId ? `&companySizeId=${companySizeId}` : ``}` +
      `&${page ? `page=${page}` : ``}` +
      `&${limit ? `limit=${limit}` : ``}` +
      `&${lang ? `lang=${lang}` : ``}`;
    return axiosClient.get(URL);
  },

  getCompanyById: (id: any, lang: string) => {
    const URL = `/v3/companies/${id}?lang=${lang}`;
    return axiosClient.get(URL);
  },

  postBookmarkCompany: (companyId: number) => {
    const URL = `/v3/company-bookmarked`;
    return axiosClient.post(
      URL,
      { companyId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
  },

  getBookmarkCompany: (
    page: number,
    limit: number,
    lang: string,
    sort: string,
  ) => {
    const URL = `/v3/company-bookmarked/account?lang=${lang}&page=${page}&limit=${limit}&sort=${sort}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  postCompanyRating: (companyId: any, star: any, comment: string) => {
    const URL = `/v3/company-ratings`;
    return axiosClient.post(
      URL,
      { companyId, star, comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
  },

  getCompanyRating: (id: any, page: any, limit: any, lang: string) => {
    const URL = `/v3/company-ratings/company/${id}?lang=${lang}&limit=${limit}&page=${page}`;
    return axiosClient.get(URL);
  },

  getPostOfCompany: (id: any, page: any, limit: any | null, lang: string) => {
    const URL = `/v3/posts/company/${id}?lang=${lang}&limit=${limit}&page=${page}`;
    return axiosClient.get(URL);
  },

  getReviewAccountOfCompany: (id: any, lang: string) => {
    const URL = `/v3/company-ratings/account/company/${id}?lang=${lang}`;
    return axiosClient.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  editCompanyReview: (id: any, star: any, comment: string) => {
    const URL = `/v3/company-ratings/account/company/${id}`;
    return axiosClient.put(
      URL,
      { star, comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
  },

  deleteCompanyReview: (id: any) => {
    const URL = `/v3/company-ratings/account/company/${id}`;
    return axiosClient.delete(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
  getCompanyView: (page: any, limit: any | null, lang: string) => {
    const URL = `/v3/view-profiles/companies-viewed/by-account?lang=${lang}&limit=${limit}&page=${page}`;
    return axiosClient.get(URL);
  },
  getCompanySaveProfile: (page: any, limit: any | null, lang: string) => {
    const URL = `/v3/candidate-bookmarks/by-candidate?lang=${lang}&limit=${limit}&page=${page}`;
    return axiosClient.get(URL);
  },
};

export default apiCompanyV3;
