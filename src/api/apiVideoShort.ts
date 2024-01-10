// import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers'
import axios from 'axios';
import axiosClient from './axiosClient';

const apiVideoShort = {
    getVideoShort: (
        page: number,
        limit: number
    ) => {
        const URL = `v3//post-medias?page=${page}&limit=${limit}`;
        return axiosClient.get(URL)
    }
}

export default apiVideoShort;