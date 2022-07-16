import React, {useState, useEffect} from 'react'
import {Redirect} from "react-router-dom"
import Moment from 'react-moment';
import Question from '../components/Question';
import {Button} from "react-bootstrap"

function GiveQuiz() {

  const [quiz, setQuiz] = useState({
    quizQuestions: {}
  })
  const [user, setUser] = useState({})
  const [redirect, setRedirect] = useState(false);
  const [quizEndTimeForUser, setQuizEndTimeForUser] = useState()
  const [temp, setTemp] = useState(false);

  useEffect(() => {
    const localUser = localStorage.getItem("quizgiver");
    const localquiz = localStorage.getItem("quiz");

    if(!localUser || !localquiz || JSON.parse(localUser).quizid != JSON.parse(localquiz).id){
      setRedirect(true);
    }
    else{
      setQuiz(JSON.parse(localquiz));
      setUser(JSON.parse(localUser));
      setQuizEndTimeForUser(JSON.parse(localUser).quizEndTimeForUser);
      const interval = setInterval(() => {
        setTemp(!temp);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [])

  if(redirect){
    <Redirect to="/" />
  }

  // if(Date.now() > Date.parse(quizEndTimeForUser)){
  //   return <Redirect to={`quiz/${quiz.id}`} />
  // }
  
  return (
    <div className='givequiz'>
      <div className='givequiz-end make-white'>
        <h4>Quiz Will End At</h4>
        <h5><Moment local>{quizEndTimeForUser}</Moment></h5>
      </div>
      <div className='givequiz-questions'>
        {Object.keys(quiz.quizQuestions).map((key, index) => (
          <Question 
            id={key}
            question={quiz.quizQuestions[key]}
          />
        ))}
      </div>
      <div className='givequiz-finishButton'>
        <Button
          className='customButton'
        >
          Finish
        </Button>
      </div>
    </div>
  )
}

export default GiveQuiz