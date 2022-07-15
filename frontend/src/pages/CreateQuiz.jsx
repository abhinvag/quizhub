import React, {useState} from 'react'
import {Button, Form} from "react-bootstrap";

function CreateQuiz() {

    const [quizDetails, setQuizDetails] = useState({
        "quizName": "",
        "startDate": "",
        "startTime": "",
        "endDate": "",
        "endTime": "",
        "duration": "00:00:00",
        "inviteOnly": false,
        "invitedEmails": ""
    })

    const updateQuizDetails = (event) => {
        const {name, value} = event.target;
        setQuizDetails(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const handleQuizCreate = () => {
        console.log(quizDetails);
    }

    const [quizQuestions, setQuizQuestions] = useState([
        {
            "id": "",
            "title": "",
            "marks": "",
            "options": [
                {
                    "id": "",
                    "title": ""
                },
            ],
            "correctOptionId": ""
        },
    ])

    return (
        <div className='createquiz'>
            <h1 className='createquiz-heading'>Create Quiz</h1>
            <div className='createquiz-action-div make-white'>
                <div className='createquiz-details'>
                    <div className='createquiz-details-form'>
                        <Form.Group>
                            <Form.Label>Quiz Name</Form.Label>
                            <Form.Control
                                className='createquiz-details-inputs'
                                placeholder='Quiz Name'
                                name="quizName"
                                value={quizDetails.quizName}
                                onChange={updateQuizDetails}
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                className='createquiz-details-inputs'
                                placeholder='Start Date'
                                name="startDate"
                                value={quizDetails.startDate}
                                onChange={updateQuizDetails}
                                type="date"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                className='createquiz-details-inputs'
                                placeholder='Start Time'
                                name="startTime"
                                value={quizDetails.startTime}
                                onChange={updateQuizDetails}
                                type="time"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                className='createquiz-details-inputs'
                                placeholder='End Date'
                                name="endDate"
                                value={quizDetails.endDate}
                                onChange={updateQuizDetails}
                                type="date"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                className='createquiz-details-inputs'
                                placeholder='End Time'
                                name="endTime"
                                value={quizDetails.endTime}
                                onChange={updateQuizDetails}
                                type="time"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Quiz Duration (hh:mm:ss)</Form.Label>
                            <Form.Control
                                className='createquiz-details-inputs'
                                placeholder='Quiz Duration'
                                type="text"
                                pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}" 
                                onChange={updateQuizDetails}
                                name="duration"
                                value={quizDetails.duration}
                                required
                            />
                        </Form.Group>
                    </div>
                    <Form.Check 
                        type="switch"
                        label="Make Quiz Invite Only"
                        style={{"marginBottom": "1%"}}
                        name="inviteOnly"
                        value={quizDetails.inviteOnly}
                        onChange={(event) => {
                            setQuizDetails(prevValue => {
                                return {
                                    ...prevValue,
                                    ["inviteOnly"]: event.target.checked
                                }
                            })
                        }}
                    />
                    {quizDetails.inviteOnly && (
                        <Form.Control 
                            as="textarea"
                            placeholder='Enter Allowed Emails (Space Sperated)'
                            name="invitedEmails"
                            value={quizDetails.invitedEmails}
                            onChange={updateQuizDetails}
                        />
                    )}
                </div>
                <div className='createquiz-questions'>

                </div>
                <Button
                    className="customButton"
                    onClick={() => handleQuizCreate()}
                >
                    Create
                </Button>
            </div>
        </div>
    )

}

export default CreateQuiz