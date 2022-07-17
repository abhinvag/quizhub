import React, {useState, useEffect} from 'react'
import {Button} from "react-bootstrap";
import NewQuizDetails from '../components/NewQuizDetails';
import NewQuizQuestions from '../components/NewQuizQuestions';
import {BiRocket} from "react-icons/bi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {nanoid} from "nanoid";
import axios from "axios";

function CreateQuiz(props) {

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

    const [quizQuestions, setQuizQuestions] = useState({})
    
    useEffect(() => {
        const strigifiedNewQuiz = localStorage.getItem("newQuiz");
        if(strigifiedNewQuiz != undefined || strigifiedNewQuiz != null){
            const newQuiz = JSON.parse(strigifiedNewQuiz);
            setQuizDetails(newQuiz.quizDetails)
            setQuizQuestions(newQuiz.quizQuestions)
        }
    }, [])

    useEffect(() => {
        const newQuiz = {
            quizDetails,
            quizQuestions
        }
        localStorage.setItem("newQuiz", JSON.stringify(newQuiz))
    }, [quizDetails, quizQuestions])

    const handleQuizCreate = async () => {
        if( quizDetails.quizName == "" || 
            quizDetails.startDate == "" || 
            quizDetails.startTime == "" || 
            quizDetails.endDate == "" ||
            quizDetails.endTime == ""
        ){
            toast.error("Mandatory Fields Empty !!");
        }
        else{
            var temp = quizDetails.duration.split(":")
            if(temp.length < 3 || temp[0].length != 2 || temp[2].length != 2 || temp[2].length != 2){
                toast.error("Duration Format Incorrect !!")
            }
            else{


                const user = localStorage.getItem("user");
                if(user === "undefined" || user === null){
                    toast.error("Login to create quiz");
                    
                }
                else{
                    const id = nanoid();
                    
                    const inviteLink = `${process.env.REACT_APP_BASE_URL}/quiz/${id}`
                    
                    let newQuiz = {
                        admin_id:JSON.parse(user).uid,
                        id,
                        quizDetails,
                        quizQuestions
                    }

                    console.log(newQuiz);

                    if(newQuiz.quizDetails.inviteOnly){
                        newQuiz.quizDetails.invitedEmails = newQuiz.quizDetails.invitedEmails.split(" ");
                    }

                    try {
                        const data = await axios.post("https://quizhub-api.herokuapp.com/newquiz", newQuiz);
                        console.log(data);
                        if(data.data.Success === true){
                            navigator.clipboard.writeText(inviteLink);
                            toast.success("Invite Link Copied To Clipboard !")
                            console.log(newQuiz);
                        }
                        else toast.error("Some Error Occurred !!");
                    } catch (error) {
                        console.log(error)
                    }

                    localStorage.removeItem("newQuiz");
                }
            }
        }
    }

    return (
        <div className='createquiz'>
            <h1 className='createquiz-heading'>Create Quiz</h1>
            <div className='createquiz-action-div make-white'>
                <NewQuizDetails 
                    quizDetails={quizDetails}
                    setQuizDetails={setQuizDetails}
                />
                <NewQuizQuestions 
                    quizQuestions={quizQuestions}
                    setQuizQuestions={setQuizQuestions}
                />
                <Button
                    className="customButton createquiz-button"
                    onClick={() => handleQuizCreate()}
                >
                    Create <BiRocket />
                </Button>
            </div>
            <ToastContainer />
        </div>
    )

}

export default CreateQuiz