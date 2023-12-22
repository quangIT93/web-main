// import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers'
import axios from 'axios';
import axiosClient from './axiosClient';
// api/productApi.js

const apiYoutubeShort = {
    getYoutubeShort: (channelId: string, keiApi: string) => {
        const URL = 'https://youtube.googleapis.com/youtube/v3/search?type=short&part=snippet' +
            `&channelId=${channelId}` +
            `&maxResults=5&order=date&type=video&key=${keiApi}`
            ;
        return axios.get(URL, {
            headers: {
                // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    },
    getYoutubeShortPageToken: (
        channelId: string,
        keiApi: string,
        pageToken: string,
    ) => {
        const URL = 'https://youtube.googleapis.com/youtube/v3/search?type=short&part=snippet' +
            `&channelId=${channelId}` +
            `&pageToken=${pageToken}` +
            `&maxResults=10&order=date&type=video&key=${keiApi}`
            ;
        return axios.get(URL, {
            headers: {
                // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    },
};

export default apiYoutubeShort;
