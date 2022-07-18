import React, {useState, useEffect} from 'react'
import {Redirect} from "react-router-dom"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PastQuizDetails from '../components/PastQuizDetails';
import {Button} from "react-bootstrap"
import Header from '../components/Header';

function QuizHistory() {
    
    const [redirect, setRedirect] = useState(false);
    const [adminData, setAdminData] = useState({
        name: "",
        email:"",
        quiz_info: {}
    });
    const [loading, setLoading] = useState(true)
    const [showPast, setShowPast] = useState(false);
    const [pastQuizData, setPastQuizData] = useState({});

    const fetchData = async () => {
        const user = localStorage.getItem("user");
        if(user === "undefined" || user == null){
            setRedirect(true);
        }
        else{
            try {
                console.log(JSON.parse(user));
                const res = await axios.post("https://quizhub-api.herokuapp.com/allquiz", {
                    user_id: JSON.parse(user).uid
                })
                console.log(res.data);
                setAdminData(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    if(redirect){
        return <Redirect to="/" />
    }

    if(showPast){
        return( 
            <PastQuizDetails 
                id={pastQuizData} 
                setShowPast={setShowPast}
            />
        )
    }

    const endQuiz = async (id) => {
        try {
            setLoading(true);
            const date = new Date()
            const obj = {
                quiz_id:id,
                endTime: date.getHours() + ":" + date.getMinutes(),
                endDate: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
            }
            console.log(obj);
            const res = await axios.post("https://quizhub-api.herokuapp.com/updateEndTime", obj);
            console.log(res.data);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <Header />
            <div className='history'>
                <h1 className='history-heading'>Your Past Quizes</h1>
                <div className='make-white history-list'>
                    {loading ? (
                        <Skeleton count={10} /> 
                    ):(
                        <>
                            {Object.keys(adminData.quiz_info).map((key, index) => (
                                <div className='history-list-quiz'>
                                    <div 
                                        onClick={() => {
                                            setPastQuizData(key);
                                            setShowPast(true);
                                        }}
                                        className='history-list-quiz-1'
                                    >
                                        {adminData.quiz_info[key].quizName} 
                                    </div>
                                    <div
                                        onClick={() => {
                                            const inviteLink = `${process.env.REACT_APP_BASE_URL}/quiz/${key}`
                                            navigator.clipboard.writeText(inviteLink);
                                            toast.success("Invite Link Copied To Clipboard !")
                                        }}
                                        className='history-list-quiz-2'
                                    >
                                        {key}
                                    </div>
                                    <div className='history-list-quiz-3'>
                                        {(Date.parse(adminData.quiz_info[key].endDate + " " + adminData.quiz_info[key].endTime) > Date.now())? (
                                            <Button
                                                className="customButton-outline"
                                                onClick={() => {
                                                    endQuiz(key);
                                                }}
                                            >
                                                End Quiz
                                            </Button>
                                        ):(
                                            <Button
                                                className="customButton-outline"
                                                disabled
                                            >
                                                Quiz Ended
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default QuizHistory