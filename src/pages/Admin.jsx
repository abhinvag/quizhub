import React, {useState} from 'react'
import admin from "../assets/admin.svg"
import {Button} from "react-bootstrap"
import {Link, Redirect} from "react-router-dom"
import Header from '../components/Header';

function Admin() {

  const [redirect, setRedirect] = useState(false);

  if(redirect){
    return <Redirect to="/" />
  }

  return (
    <>
      <Header />
      <div className='admin partition-container'>
        <div className='partition-container-left'>
          <div className='admin-action-div make-white'>
              <Link to="/createquiz">
                  <Button
                      className='customButton'
                  > 
                      Create Quiz
                  </Button>
              </Link>
              <Link to="/history">
                <Button
                    className='customButton'
                >
                    See Previous Quizes 
                </Button>
              </Link>
              <Button
                  className='customButton'
                  onClick={() => {
                    localStorage.removeItem("user");
                    setRedirect(true);
                  }}
              >
                  Logout
              </Button>
          </div>
        </div>
        <div className='partition-container-right'>
          <img  alt='admin' className="partition-container-left-img" src={admin} />
        </div>
      </div>
    </>
  )
}

export default Admin