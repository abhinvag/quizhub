import React, { useState, useEffect } from 'react'
import {Button} from "react-bootstrap"
import axios from "axios";
import {Redirect} from "react-router-dom"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Question({id, question}) {

  const [chosenOption, setChosenOption] = useState("none");
  const [quiz, setQuiz] = useState({})
  const [user, setUser] = useState({})
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const localUser = localStorage.getItem("quizgiver");
      const localquiz = localStorage.getItem("quiz");
    
      if(localUser === "undefined" || localquiz === "undefined" || JSON.parse(localUser).quizid !== JSON.parse(localquiz).id){
        setRedirect(true);
      }
      else{
        setQuiz(JSON.parse(localquiz));
        setUser(JSON.parse(localUser));
      }

      try {
        const obj = {
          quiz_id: JSON.parse(localquiz).id,
          question_id: id,
          player_id: JSON.parse(localUser).id
        }
        const res = await axios.post("https://quizhub-api.herokuapp.com/checkattempt", obj);
        setLoading(false);
        //console.log(res.data);
        if(res.data.duplicate == true){
          //console.log(res.data.option_id)
          setChosenOption(res.data.option_id);
          //setChosenOption("dgrthrth")W
        } 
      } catch (error) {
        console.log(error);
      }


    }
    fetchData();
  }, [])

  const handleQuestionSubmission = async (option_id) => {
    console.log(option_id);
    setChosenOption(option_id);
    console.log(quiz);
    try {
      const obj = {
        quiz_id: quiz.id,
        question_id: id,
        player_id: user.id,
        option_id: option_id
      }
      console.log(obj);
      const res = await axios.post("https://quizhub-api.herokuapp.com/check", obj) 
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  //console.log(chosenOption);

  if(redirect){
    return <Redirect to="/" />
  }

  if(loading){
    return (
      <Skeleton count={7} />
    )
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
                {key === chosenOption ? (
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