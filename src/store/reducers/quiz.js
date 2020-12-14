import {FETCH_FINISH, FETCH_QUIZ_SUCCESS, FETCH_QUIZES_SUCCESS, FETCH_START} from "../actions/actionTypes";

const initialState = {
    quizes : [],
    loading : true,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,//{id: 'success' 'error'}
    quiz: []
}

const quizReducer = (state = initialState,action)=>{
    switch (action.type){
        case FETCH_START:{
            return ({
                ...state,
                loading: true
            })
        }
        case FETCH_FINISH:{
            return ({
                ...state,
                loading: false
            })
        }
        // eslint-disable-next-line no-undef
        case FETCH_QUIZES_SUCCESS:{
            return ({
                ...state,
                quizes: [...action.quizes]
            })
        }

        case FETCH_QUIZ_SUCCESS :{
            console.log("from reducer",action)
            return ({
                ...state,
                quiz: [...action.quiz]
            })
        }
        default : return state
    }
}

export default quizReducer