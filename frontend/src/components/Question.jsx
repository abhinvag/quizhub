import React, { useState } from 'react'
import {Button} from "react-bootstrap"

function Question({id, question}) {

  const [chosenOption, setChosenOption] = useState("none");

  const handleQuestionSubmission = (id) => {
    setChosenOption(id);
    //TODO: backend connection
  }

  return (
    <div className='question make-white'>
      <h1 className='question-title'>{question.title}</h1>
      <h1 className='question-content'>{question.content}</h1>
      <h1 className='question-marks'>Marks: {question.marks}</h1>
      <div className='question-options'>
        {chosenOption == "none" ? (
          <>
          {Object.keys(question.options).map((key, index) => (
            <Button
              className="customButton-outline"
              onClick={() => handleQuestionSubmission(key)}
            >
              {question.options[key].title}
            </Button>
          ))}
          </>
        ):(
          <>
            {Object.keys(question.options).map((key, index) => (
              <>
                {key == chosenOption ? (
                  <Button
                    className="customButton"
                    disabled
                  >
                    {question.options[key].title}
                  </Button>
                ):(
                  <Button
                    className="customButton-outline"
                    disabled
                  >
                    {question.options[key].title}
                  </Button>
                )}
              </>

            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Question