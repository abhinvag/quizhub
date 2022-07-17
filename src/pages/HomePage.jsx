import React, {useState} from 'react'
import {Button, Form} from "react-bootstrap"
import home from "../assets/home.svg"
import {Redirect} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function HomePage() {

  const [quizCode, setQuizCode] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    if(quizCode == ""){
      toast.error("Please Enter Quiz Code");
    }
    else setRedirect(true);
  }

  if(redirect){
    return <Redirect to={`/quiz/${quizCode}`}/>
  }

  return (
    <div className='partition-container'>
      <div className='partition-container-left'>
        <img  alt='home' className="partition-container-left-img" src={home} />
      </div>
      <div className='partition-container-right'>
        <div className='make-white home-action-div'>
          <Form.Control
            placeholder="Enter Quiz Code"
            value={quizCode}
            onChange={(event) => {
              setQuizCode(event.target.value);
            }}
            className="home-action-div-input"
          />
          <Button
            className='customButton'
            onClick={() => handleClick()}
          >
            Join Quiz
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default HomePage