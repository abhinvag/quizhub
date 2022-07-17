import React, {useState, useEffect} from 'react'
import {Redirect, Link} from "react-router-dom"
import Moment from 'react-moment';
import Question from '../components/Question';
import {Button} from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function GiveQuiz() {

  const [quiz, setQuiz] = useState({
    quizQuestions: {}
  })
  const [user, setUser] = useState({})
  const [redirect, setRedirect] = useState(false);
  const [quizEndTimeForUser, setQuizEndTimeForUser] = useState()
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {

      const localUser = localStorage.getItem("quizgiver");
      const localquiz = localStorage.getItem("quiz");

      if(localUser !== "undefined" || localquiz !== "undefined" || JSON.parse(localUser).quizid === JSON.parse(localquiz).id){
        setQuiz(JSON.parse(localquiz));
        setUser(JSON.parse(localUser));
        setQuizEndTimeForUser(JSON.parse(localUser).quizEndTimeForUser);
      }
      else{
        setRedirect(true);
      }
  }, [])

    const hourRemaining =  parseInt((Date.parse(quizEndTimeForUser)-Date.now())/(3600000))
    const minRemaining  = parseInt((Date.parse(quizEndTimeForUser)-Date.now())/(1000*60))-(hourRemaining*60);
    const secondRemaining = parseInt(((Date.parse(quizEndTimeForUser)-Date.now())/1000)-(minRemaining*60))

    // console.log(
    //   "Hour", hourRemaining,
    //   "Minutes", minRemaining,
    //   "Seconds", secondRemaining 
    // )

    if(redirect){
      console.log("redirect");
      return <Redirect to="/" />
    }
    else if(hourRemaining <= 0 && minRemaining <= 0 && secondRemaining <= 0){
      toast.error("Test Attempted !!")
      return <Redirect to={`quiz/${quiz.id}`} />
    }

    return (
      <div className='givequiz'>
        <div className='givequiz-end make-white'>
          <h4>Time Remaining</h4>
          <h5>{hourRemaining}:{minRemaining}:{secondRemaining}</h5>
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
          <Link to={`quiz/${quiz.id}`}>
            <Button
              className='customButton'
            >
              Finish
            </Button>
          </Link>
        </div>
        <ToastContainer />
      </div>
    )

}

export default GiveQuiz