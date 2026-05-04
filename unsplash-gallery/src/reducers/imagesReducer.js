const imagesReducerDefaultStarte = {
    images : [],
    keyword: null,
    page: 1,
    loading: false,
    error: null,
    hasMore: true
}

const imagesReducer = (state = imagesReducerDefaultStarte, action) => {
    switch(action.type){
        case 'SET_PAGE' : 
            return {
                ...state,
                page: action.page
            }

        case 'SET_IMAGES_REQUEST' :
            return {
                ...state,
                loading: true,
                error: null
            }

        case 'SET_IMAGES' : 
            return {
                ...state, 
                images: Array.isArray(action.images) ? action.images : [],
                loading: false,
                error: null,
                hasMore: action.hasMore
            }

        case 'EXTEND_IMAGES' : 
            return {
                ...state,
                images : [
                    ...state.images,
                    ...(Array.isArray(action.images) ? action.images : [])
                ],
                loading: false,
                error: null,
                hasMore: action.hasMore
            }

        case 'SET_IMAGES_ERROR' :
            return {
                ...state,
                loading: false,
                error: action.error,
                hasMore: false
            }

        case 'SET_KEYWORD' : 
            return {
                ...state,
                keyword: action.keyword
            }

        default: 
            return state;
    }
} 

export default imagesReducer;
