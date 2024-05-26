const initialState = {
    data: [],
    isLoading: true,
    error: null,
};

const questionReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case "POST_QUESTION":
            return { ...state }


        case "POST_ANSWER":
            return { ...state, data: action.payload }

        case "FETCH_ALL_QUESTIONS": 
            return { ...state, data: action.payload , isLoading: false }

        default:
            return state
    }
}

export default questionReducer