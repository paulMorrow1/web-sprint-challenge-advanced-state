import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchQuiz as _fetchQuiz,
  selectAnswer as _selectAnswer,
  postAnswer as _postAnswer,
} from "../state/action-creators";

function Quiz({
  initialQuiz,
  initialSelectedAnswer,
  fetchQuiz,
  selectAnswer,
  postAnswer,
}) {
  useEffect(() => {
    if (!initialQuiz) fetchQuiz();
  }, [initialQuiz]);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        initialQuiz ? (
          <>
            <h2>{initialQuiz?.question}</h2>

            <div id="quizAnswers">
              {initialQuiz?.answers?.map((answer) => {
                return (
                  <div
                    className={`answer ${
                      answer?.answer_id === initialSelectedAnswer
                        ? "selected"
                        : ""
                    }`}
                    key={answer?.answer_id}
                  >
                    {answer?.text}
                    <button
                      type="button"
                      onClick={() => selectAnswer(answer?.answer_id)}
                    >
                      {answer?.answer_id === initialSelectedAnswer
                        ? "SELECTED"
                        : "Select"}
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              id="submitAnswerBtn"
              type="button"
              disabled={!initialSelectedAnswer}
              onClick={() => {
                postAnswer({
                  quizId: initialQuiz?.quiz_id,
                  answerId: initialSelectedAnswer,
                });
              }}
            >
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    initialQuiz: state.quiz,
    initialSelectedAnswer: state.selectedAnswer,
  };
};

export default connect(mapStateToProps, {
  fetchQuiz: _fetchQuiz,
  selectAnswer: _selectAnswer,
  postAnswer: _postAnswer,
})(Quiz);
