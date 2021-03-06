import { useDispatch, useSelector } from "react-redux";
import { decode } from "html-entities";
import { useHistory } from "react-router-dom";
import { CLEAR_STORE } from "../../redux/actionTypes";

const Right = () => <span style={{ color: "green" }}>✔ </span>;
const Wrong = () => <span style={{ color: "red" }}>✘ </span>;

const ResultsPage = () => {
  const questions = useSelector((state) => state);
  const score = questions.reduce(
    (acc, curr) =>
      curr.question.correct_answer === curr.answer ? acc + 1 : acc,
    0
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const restart = () => {
    dispatch({
      type: CLEAR_STORE,
      payload: {},
    });
    history.push("/trivia");
  };

  return (
    <div className="container home">
      <div className="card">
        <h1>You Scored {score} / 10</h1>
      </div>
      <div className="card">
        {questions.map((question, idx) => (
          <h1 key={idx}>
            {question.question.correct_answer === question.answer ? (
              <Right />
            ) : (
              <Wrong />
            )}
            {decode(question.question.question)}
          </h1>
        ))}
      </div>

      <div className="buttons">
        <button className="glowButton glowButtonGreen" onClick={restart}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
