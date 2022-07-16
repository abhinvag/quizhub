import React, {useState} from 'react'
import {Form, Button} from "react-bootstrap";
import {nanoid} from "nanoid";
import {AiOutlineDelete, AiOutlinePlus} from "react-icons/ai"

function NewQuestionOptions({questionId, question, updateQuestions}) {

    //const [questionOptions, setQuestionOptions] = useState(question.options)
    
    const updateOptions = (op, id, title) => {

        const clone = JSON.parse(JSON.stringify(question.options));

        if(op == "add"){
            id = nanoid();
            clone[id] = {
                title,
            };
        }
        else if(op == "update"){
            clone[id].title = title;
        }
        else if(op == "delete"){
            delete clone[id];
        }

        const temp = {
            "title": question.title,
            "content": question.content,
            "marks": question.marks,
            "options": clone,
            "correctOptionId": question.correctOptionId
        }

        console.log(temp)
        console.log(questionId)

        updateQuestions("update", questionId, temp);

    }

  return (
    <div className='createquiz-questions-options'>
        {Object.keys(question.options).map((key, index) => (
            <div>
                <Form.Group>
                    <Form.Text style={{"marginLeft": "4px"}}>Option ID: {key}</Form.Text>
                    <div className='createquiz-questions-options-option'>
                        <Form.Control 
                            type="text"
                            placeholder='Title'
                            value={question.options[key].title}
                            name="title"
                            className="createquiz-questions-inputs createquiz-questions-button"
                            onChange={(event) => {
                                updateOptions("update", key, event.target.value)
                            }}
                        />
                        <Button
                            className='customButton-outline'
                            onClick={() => {
                                updateOptions("delete", key, "");
                            }}
                        >
                            <AiOutlineDelete />
                        </Button>
                    </div>
                </Form.Group>
            </div>
        ))}
        <Button
            className='customButton-outline createquiz-questions-button'
            onClick={() => {
                updateOptions("add", "", "");
            }}
        >
            Add Option <AiOutlinePlus />
        </Button>
    </div>
  )
}

export default NewQuestionOptions