import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { decode } from "html-entities";
import { useHistory } from "react-router-dom";
import { ADD_QUESTION } from "../../redux/actionTypes";

const TriviaPage = () => {
  const [counter, setCounter] = useState(0);
  const [questions, setQuestions] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const pressed = (option) => {
    dispatch({
      type: ADD_QUESTION,
      payload: { question: questions.results[counter], answer: option },
    });

    if (counter === 9) history.push("/results");
    setCounter(counter + 1);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
      );

      const questions = await response.json();
      setQuestions(questions);
    };

    fetchQuestions();
  }, []);

  return (
    <div className="container home">
      {questions ? (
        <>
          <div className="card">
            <h1>{questions.results && questions.results[counter].category}</h1>
          </div>
          <div className="card">
            <h1>
              {questions.results && decode(questions.results[counter].question)}
            </h1>
          </div>
          <h2>{counter + 1} of 10</h2>
          <div className="buttons">
            <button
              className="glowButton glowButtonGreen"
              onClick={() => pressed("True")}
            >
              True
            </button>
            <button
              className="glowButton glowButtonRed"
              onClick={() => pressed("False")}
            >
              False
            </button>
          </div>
        </>
      ) : (
        <h1 style={{ color: "white" }}>Loading...</h1>
      )}
    </div>
  );
};

export default TriviaPage;
