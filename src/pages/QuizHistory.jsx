import React, {useState, useEffect} from 'react'
import {Redirect} from "react-router-dom"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PastQuizDetails from '../components/PastQuizDetails';

function QuizHistory() {
    
    const [redirect, setRedirect] = useState(false);
    const [adminData, setAdminData] = useState({
        name: "",
        email:"",
        quizzes: {}
    });
    const [loading, setLoading] = useState(true)
    const [showPast, setShowPast] = useState(false);
    const [pastQuizData, setPastQuizData] = useState({});

    useEffect(() => {
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
    
    return (
        <div className='history'>
            <h1 className='history-heading'>Your Past Quizes</h1>
            <div className='make-white history-list'>
                {loading ? (
                    <Skeleton count={10} /> 
                ):(
                    <>
                        {Object.keys(adminData.quizzes).map((key, index) => (
                            <div className='history-list-quiz'>
                                <div 
                                    onClick={() => {
                                        setPastQuizData(key);
                                        setShowPast(true);
                                    }}
                                >
                                    Name: {adminData.quizzes[key]} 
                                </div>
                                <div
                                    onClick={() => {
                                        const inviteLink = `http://localhost:3000/quiz/${key}`
                                        navigator.clipboard.writeText(inviteLink);
                                        toast.success("Invite Link Copied To Clipboard !")
                                    }}
                                >
                                    Code: {key}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default QuizHistory