import React, {useState} from 'react'
import {Button, Form} from "react-bootstrap"
import home from "../assets/home.svg"

function HomePage() {

  const [quizCode, setQuizCode] = useState("");

  const handleClick = () => {
      //TODO: fetch quiz details from backend;
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
          >
            Join Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage