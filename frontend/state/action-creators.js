import axios from "axios";
import thunk from "redux-thunk";
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";

// ❗ You don't need to add extra action creators to achieve MVP

// thunk way
export function moveClockwise() {
  return (dispatch, getState) => {
    const { wheel } = getState();
    dispatch({
      type: MOVE_CLOCKWISE,
      payload: wheel === 5 ? 0 : wheel + 1,
    });
  };
}
// non thunk way
export function moveCounterClockwise(number) {
  return {
    type: MOVE_COUNTERCLOCKWISE,
    payload: number === 0 ? 5 : number - 1,
  };
}

export function selectAnswer(answer) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: answer,
  };
}

export function setMessage(payload) {
  return {
    type: SET_INFO_MESSAGE,
    payload,
  };
}

export function setQuiz(quiz) {
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quiz,
  };
}

export function inputChange({ key, value }) {
  return {
    type: INPUT_CHANGE,
    key: key,
    payload: value,
  };
}

export function resetForm() {
  return {
    type: RESET_FORM,
  };
}

// ❗ Async action creators
export function fetchQuiz() {
  // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
  // On successful GET:
  // - Dispatch an action to send the obtained quiz to its state
  return async function (dispatch) {
    try {
      dispatch(setQuiz(null));
      const { data } = await axios.get("http://localhost:9000/api/quiz/next");
      dispatch(setQuiz(data));
    } catch (error) {
      console.log(error);
    }
  };
}
export function postAnswer({ quizId, answerId }) {
  return async function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    try {
      const { data } = await axios.post(
        "http://localhost:9000/api/quiz/answer",
        {
          quiz_id: quizId,
          answer_id: answerId,
        }
      );
      dispatch(setMessage(data?.message));
      dispatch(selectAnswer(null));
      dispatch(fetchQuiz());
    } catch (error) {
      console.log(error);
    }
  };
}
export function postQuiz() {
  return async function (dispatch, getState) {
    try {
      // On successful POST:
      // - Dispatch the correct message to the the appropriate state
      // - Dispatch the resetting of the form
      const { form } = getState();
      const { data } = await axios.post("http://localhost:9000/api/quiz/new", {
        question_text: form?.newQuestion?.trim(),
        true_answer_text: form?.newTrueAnswer?.trim(),
        false_answer_text: form?.newFalseAnswer?.trim(),
      });
      dispatch(
        setMessage(`Congrats: "${data?.question}" is a great question!`)
      );
      dispatch(resetForm());
    } catch (error) {
      console.log(error);
    }
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
