import axios from '../../axios/axiosAPI'
import {FETCH_FINISH, FETCH_QUIZES_SUCCESS, FETCH_START, FETCH_QUIZ_SUCCESS} from "./actionTypes";

export const fetchQuizesStart = () => {
    return {
        type: FETCH_START
    }
}
export const fetchQuizesFinish = () => {
    return {
        type: FETCH_FINISH
    }
}
export const fetchQuizesSuccess = (data) => {
    return (
        {
            type: FETCH_QUIZES_SUCCESS,
            quizes: data
        }
    )

}
export const fetchQuizes = () => {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        axios.get('quiz/quizes.json')
            .then(response => {
                const q = []
                Object.keys(response.data).forEach((item, index) => {
                    q.push({
                        id: index,
                        quiz: item
                    })
                })
                dispatch(fetchQuizesSuccess(q))
            })
            .catch(e => console.error(e))

        dispatch(fetchQuizesFinish())
    }
}

export const fetchQuizeSuccess = (quiz) => {
    return ({
        type: FETCH_QUIZ_SUCCESS,
        quiz:quiz
    })


}

export const fetchQuizByID = (quizId) => {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`quiz/quizes/${quizId}.json`)
            console.log(response)
            dispatch(fetchQuizeSuccess(response.data))
            dispatch(fetchQuizesFinish())
        } catch (e) {
            console.error(e)
        }
    }
}

export const quizAnswerClick = (answerID)=>{
    return (dispatch,getState)=>{
        const state = getState()
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[this.state.activeQuestion]
        const results = state.results
        if (question.rightAnswerId === answerID) {

            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerID]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                    console.log('Finished!')
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }
}