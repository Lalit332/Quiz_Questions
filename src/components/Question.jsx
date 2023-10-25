import React, { useEffect, useState } from "react";
import mcqQuestions from "../utils/questions.json";
import Star from './star';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showMessage, setShowMessage] = useState();

  const nextQuestion = () => {
    if (currentQuestionIndex < mcqQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };



  const fetchedData = mcqQuestions[currentQuestionIndex]
  const fillStar = (fetchedData.difficulty == 'hard' ? 3 : (fetchedData.difficulty == 'medium' ? 2 : 1));

  const incorrectAnswers = fetchedData.incorrect_answers;
  const correctAnswer = fetchedData.correct_answer;
  const allAnswers = Math.floor(Math.random() * (incorrectAnswers.length + 1));
  incorrectAnswers.splice(allAnswers, 0, correctAnswer);
  const uniqueAnswers = [...new Set(incorrectAnswers)];

  const progressBar = (currentQuestionIndex + 1) / mcqQuestions.length;

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(decodeURIComponent(answer));
  };

  useEffect(() => {
    if (selectedAnswer === decodeURIComponent(fetchedData.correct_answer)) {
      setShowMessage("Correct");
    } else {
      setShowMessage("Sorry, Please Try Again");
    }
  }, [selectedAnswer]);

  return (
    <>
      <div className="App">
        {mcqQuestions && mcqQuestions.length > 0 && (
          <>
            <div className="displayQuestion">
              <div>
                <div>
                  <progress value={progressBar} style={{ width: '100%', height: "50px" }} />
                </div>
                <h3>Question {currentQuestionIndex + 1} of {mcqQuestions.length}</h3>
                <h5 className="sub-category">{decodeURIComponent(fetchedData.category)}</h5>
                <div className="stars">
                  {
                    [1, 2, 3].map((key, index) => {
                      return (
                        <Star
                          index={index}
                          key={index}
                          style={fillStar > index ? { fill: 'black' } : { fill: '#f5f5f5' }}
                        />
                      );
                    })
                  }
                </div>
                <p className="question">{decodeURIComponent(fetchedData.question)}</p>
                <div>
                  <ul className="answerButton">
                    {uniqueAnswers.map((answer, index) => (
                      <li key={index} style={{ margin: "5px" }}>
                        <button
                          onClick={() => handleAnswerClick(answer)}
                          className={selectedAnswer === decodeURIComponent(answer) ? "clicked-button" : ""}
                        >
                          {decodeURIComponent(answer)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <p> {selectedAnswer === null ? '' : showMessage}</p>
              </div>
              <div className="controlButton">

                {currentQuestionIndex + 1 === mcqQuestions.length ? "" : <button onClick={nextQuestion} style={{ display: selectedAnswer ? 'block' : 'none' }} >
                  Next Question
                </button>}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
