// import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers'
import axios from 'axios';
import axiosClient from './axiosClient';

interface FormVideoShortCreate {
  postId: number;
  linkTiktok: string | null;
  linkYouTube: string | null;
  image: any | null;
}

const apiVideoShort = {
  getVideoShortList: (page: number, limit: number) => {
    const URL = `v3/post-medias?page=${page}&limit=${limit}`;
    return axiosClient.get(URL);
  },

  getVieoShortByPostId: (id: number) => {
    const URL = `v3/post-medias/post/${id}`;
    return axiosClient.get(URL);
  },

  createVideoShort: (newVideoShort: any) => {
    const URL = `v3/post-medias`;
    return axiosClient.post(URL, newVideoShort, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
};

export default apiVideoShort;
