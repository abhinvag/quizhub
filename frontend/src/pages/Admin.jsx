import React from 'react'
import admin from "../assets/admin.svg"
import {Button} from "react-bootstrap"
import {Link} from "react-router-dom"

function Admin() {

  return (
    <div className='partition-container'>
      <div className='partition-container-left'>
        <div className='admin-action-div make-white'>
            <Link to="/createquiz">
                <Button
                    className='customButton'
                > 
                    Create Quiz
                </Button>
            </Link>
            <Button
                className='customButton'
            >
                See Previous Quizes 
            </Button>
        </div>
      </div>
      <div className='partition-container-right'>
        <img  alt='admin' className="partition-container-left-img" src={admin} />
      </div>
    </div>
  )
}

export default Admin