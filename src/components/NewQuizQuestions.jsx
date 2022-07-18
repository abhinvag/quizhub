import React, {useState} from 'react'
import {Form, Button} from "react-bootstrap"
import {nanoid} from "nanoid";
import NewQuestionOptions from './NewQuizOptions';
import {AiOutlineDelete, AiOutlinePlus} from "react-icons/ai"

function NewQuizQuestions({quizQuestions, setQuizQuestions}) {

    const [newQuestion, setNewQuestion] = useState({
        "id": "",
        "title": "",
        "content": "",
        "marks": "",
        "options": {},
        "correctOptionId": ""
    })

    const updateQuestions = (op, id, question) => {
        const clone = JSON.parse(JSON.stringify(quizQuestions));
        if(op == "add"){
            id = nanoid();
            clone[id] = {
                "title": question.title,
                "content": question.content,
                "marks": question.marks, 
                "options": question.options,
                "correctOptionId": question.correctOptionId
            };
            setNewQuestion({
                "id": "",
                "title": "",
                "content": "",
                "marks": "",
                "options":{},
                "correctOptionId": ""
            })
        }
        else if(op == "update"){
            clone[id].title = question.title;
            clone[id].content = question.content;
            clone[id].marks = question.marks;
            clone[id].options = question.options;
            clone[id].correctOptionId = question.correctOptionId;
        }
        else if(op == "delete"){
            delete clone[id];
        }
        //console.log(clone)
        //localStorage.setItem("newQuizQuestions", JSON.stringify(clone));
        setQuizQuestions(clone);
    }

    const updateQuestion = (event, id) => {
        let temp = quizQuestions[id];
        const {name, value} = event.target;
        temp[name] = value;
        updateQuestions("update", id, temp)
    }

    return (
        <div className='createquiz-questions'>
            <div className='createquiz-questions-top'>
                <h4 className='createquiz-questions-top-heading'>Quiz Questions</h4>
                <Button 
                    className="customButton"
                    onClick={() => {
                        updateQuestions("add", "", newQuestion);
                    }}
                >
                    Add New Question <AiOutlinePlus />
                </Button>
            </div>
            {Object.keys(quizQuestions).length == 0 ? (
                <h5 className='createquiz-questions-length0'>Added Will be Shown Here</h5>
            ): (
                <div>
                {Object.keys(quizQuestions).map((key, index) => (
                    <div key={index}>
                        <Form.Text>Question ID: {key}</Form.Text>
                        <Form.Control 
                            type="text"
                            placeholder='Title'
                            name="title"
                            value={quizQuestions[key].title}
                            className="createquiz-questions-inputs"
                            onChange={(event) => {
                                updateQuestion(event, key)
                            }}
                        />
                        <Form.Control 
                            type="text"
                            as="textarea"
                            placeholder='Content'
                            name="content"
                            value={quizQuestions[key].content}
                            className="createquiz-questions-inputs"
                            onChange={(event) => {
                                updateQuestion(event, key)
                            }}
                        />
                        <Form.Control 
                            type="number"
                            min="0"
                            placeholder='Marks'
                            name="marks"
                            pattern="[0-9]+"
                            value={quizQuestions[key].marks}
                            className="createquiz-questions-inputs"
                            onChange={(event) => {
                                updateQuestion(event, key)
                            }}
                        />
                        <Form.Control 
                            type="text"
                            name="correctOptionId"
                            value={quizQuestions[key].correctOptionId}
                            placeholder='Correct Option ID'
                            className="createquiz-questions-inputs"
                            onChange={(event) => {
                                updateQuestion(event, key)
                            }}
                        />
                        <NewQuestionOptions 
                            questionId={key}
                            question={quizQuestions[key]}
                            updateQuestions={updateQuestions}
                        />
                        <Button
                            className='customButton createquiz-questions-button'
                            onClick={() => {
                                updateQuestions("delete", key, {});
                            }}
                        >
                            Delete Question <AiOutlineDelete />
                        </Button>
                    </div>
                ))}
                </div>
            )}
        </div>
    )
}

export default NewQuizQuestions