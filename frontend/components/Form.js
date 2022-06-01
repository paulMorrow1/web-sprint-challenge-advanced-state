import React from "react";
import { connect } from "react-redux";
import {
  inputChange as _inputChange,
  resetForm as _resetForm,
  postQuiz as _postQuiz,
} from "../state/action-creators";

export function Form({
  inputChange,
  resetForm,
  postQuiz,
  newQuestion,
  newTrueAnswer,
  newFalseAnswer,
}) {
  const onChange = ({ target }) => {
    inputChange({ key: target.name, value: target.value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    postQuiz();
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        value={newQuestion}
        onChange={onChange}
        id="newQuestion"
        name="newQuestion"
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        value={newTrueAnswer}
        onChange={onChange}
        id="newTrueAnswer"
        name="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        value={newFalseAnswer}
        onChange={onChange}
        id="newFalseAnswer"
        name="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button
        id="submitNewQuizBtn"
        type="submit"
        disabled={
          newQuestion?.trim() === "" ||
          newTrueAnswer?.trim() === "" ||
          newFalseAnswer?.trim() === ""
        }
      >
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer,
    newFalseAnswer: state.form.newFalseAnswer,
  };
};

export default connect(mapStateToProps, {
  inputChange: _inputChange,
  resetForm: _resetForm,
  postQuiz: _postQuiz,
})(Form);
