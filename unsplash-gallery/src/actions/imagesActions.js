import Axios from 'axios';
import { backendURL } from '../config/index';

const normalizeImages = (data) => {
    if (Array.isArray(data)) {
        return data;
    }

    if (data && Array.isArray(data.results)) {
        return data.results;
    }

    if (data && data.response && Array.isArray(data.response.results)) {
        return data.response.results;
    }

    if (data && Array.isArray(data.response)) {
        return data.response;
    }

    return [];
}

const getPhotosUrl = ({ page, imageCount, keyword }) => {
    if (!keyword) {
        return `${backendURL}/api/photos?page=${page}&count=${imageCount}`;
    }

    return `${backendURL}/api/photos/search?keyword=${encodeURIComponent(keyword)}&page=${page}&count=${imageCount}`;
}

export const setKeyword = (keyword) =>({
    type: 'SET_KEYWORD',
    keyword
})

export const setPage = (page) => ({
    type: 'SET_PAGE',
    page
})

export const setImages = ({page, imageCount, keyword}) => dispatch => {
    dispatch({ type: 'SET_IMAGES_REQUEST' });

    Axios.get(getPhotosUrl({ page, imageCount, keyword }))
        .then((res) => {
            const images = normalizeImages(res.data);

            dispatch({
                type: 'SET_IMAGES',
                images,
                hasMore: images.length >= imageCount
            });
        })
        .catch(() => {
            dispatch({
                type: 'SET_IMAGES_ERROR',
                error: 'Unable to load images. Please try again.'
            });
        });
}

export const extendImages = ({page, imageCount, keyword}) => dispatch => {
    dispatch({ type: 'SET_IMAGES_REQUEST' });

    Axios.get(getPhotosUrl({ page, imageCount, keyword }))
        .then((res) => {
            const images = normalizeImages(res.data);

            dispatch({
                type: 'EXTEND_IMAGES',
                images,
                hasMore: images.length >= imageCount
            });
        })
        .catch(() => {
            dispatch({
                type: 'SET_IMAGES_ERROR',
                error: 'Unable to load more images. Please try again.'
            });
        });
}
