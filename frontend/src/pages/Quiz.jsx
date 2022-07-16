import React, {useState, useEffect} from 'react'
import Moment from 'react-moment';
import wait from "../assets/wait.svg"
import completed from "../assets/completed.svg"
import {Button, Form} from "react-bootstrap"
import {GrFormNextLink} from "react-icons/gr"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {nanoid} from "nanoid";
import {Redirect} from "react-router-dom";

function Quiz() {

    //const [quiz, setQuiz] = useState();

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [duration, setDuration] = useState();
    const [temp, setTemp] = useState(false);
    const [start, setStart] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [userName, setUserName] = useState("");
    const [showOTPBox, setShowOTPBox] = useState(false);
    const [otp, setOtp] = useState();
    const [sendedOtp, setSendedOtp] = useState();

    const quiz = {
        id: "jhsdbfjhdvbdjsnvb",
        quizDetails:{
            quizName:"Test",
            startDate:"2022-07-16",
            startTime:"18:35",
            endDate:"2022-07-16",
            endTime:"20:08",
            duration:"00:10:00",
            inviteOnly:false,
            invitedEmails:["abhinav.24.2001@gmail.com"]
        },
        quizQuestions:{
            pOk__aWA300qtNDEpYhED:{
                title:"Who is the prime minister of India",
                content:"Hint: kjdfvjsevejvbresiubruitvbrisutvirjunbiutrburtgburtgburtjb",
                marks:"2",
                options:{
                    v67ciXyE9DWWOxqVO62ov:{
                        title:"Joe Biden"
                    },
                    LyWCrXe8Ynmbh3ZOWey8P:{
                        title:"Narendra Modi"
                    },
                    pUnkPqnXC2bM3lz4r0GQ3:{
                        title:"Amit Shah",
                    },
                    k3NzgQU3ndszOToYshTto:{
                        title:"Ashok Gehlot"
                    }
                },
                correctOptionId:"LyWCrXe8Ynmbh3ZOWey8P"
            }
        }
    }

    useEffect(() => {
        async function fetchData(){
            try{
                //let res = await axios.get(`/user/get/${prop.match.params.id}`)
                //console.log(res.data);
                //setQuiz(res.data);
                setStartTime(new Date(quiz.quizDetails.startDate + " " + quiz.quizDetails.startTime))
                setEndTime(new Date(quiz.quizDetails.endDate + " " + quiz.quizDetails.endTime))
                setDuration(quiz.quizDetails.duration);
                localStorage.setItem("quiz", JSON.stringify(quiz));
            
                const interval = setInterval(() => {
                    setTemp(!temp);
                }, 1000);

                return () => clearInterval(interval);
            }
            catch(e){
                console.log(e);
            }
        }
        fetchData();
    }, []);

    const verifyEmail = () => {
        var idx = quiz.quizDetails.invitedEmails.indexOf(userName);
        if(idx == -1){
            toast.error("You Are Not Allowed To Attend This Quiz !!");
        }
        else{
            // TODO: SEND OTP  - setSendedOtp
            setShowOTPBox(true);
            toast.info("OTP Has Been Sent to Your Email ID.")
        }
    }

    const verifyOTP = () => {
        if(otp == sendedOtp){
            setShowQuestion(true)
        }
        else{
            toast.error("OTP Invalid");
        }
    }

    if(showQuestion){

        let user;

        user = localStorage.getItem("quizgiver");

        if(user != undefined && user != null){
            user = JSON.parse(user);
            if(user.quizid != quiz.id){
                const d = duration.split(":");
                const dInMs = d[0]*3600000 + d[1]*60000 + d[2]*1000;
                const quizEndTimeForUser = new Date(Math.min(Date.now()+dInMs, Date.parse(endTime)));
                user = {
                    id: nanoid(),
                    name: userName,
                    quizid: quiz.id,
                    quizEndTimeForUser:quizEndTimeForUser
                }
            }
        }
        else{
            const d = duration.split(":");
            const dInMs = d[0]*3600000 + d[1]*60000 + d[2]*1000;
            const quizEndTimeForUser = new Date(Math.min(Date.now()+dInMs, Date.parse(endTime)));
            user = {
                id: nanoid(),
                name: userName,
                quizid: quiz.id,
                quizEndTimeForUser:quizEndTimeForUser
            }
        }

        localStorage.setItem("quizgiver", JSON.stringify(user));

        return <Redirect to="/givequiz" />

    }
    else if(Date.now() < Date.parse(startTime)){
        return (
            <div className='quiz quiz-layout partition-container'>
                <div className='partition-container-left'>
                    <img  alt='wait' className="partition-container-left-img" src={wait} />
                </div>
                <div className='partition-container-right'>
                    <div className='quiz-willstart make-white'>
                        <h4>Quiz Will Start At</h4>
                        <h5><Moment local>{startTime}</Moment></h5>
                        <h4>Quiz Duration (hh:mm:ss)</h4>
                        <h5>{duration}</h5>
                    </div>
                </div>
            </div>
        )
    }
    else if(Date.now() > Date.parse(endTime)){
        return (
            <div className='quiz quiz-layout partition-container'>
                <div className='partition-container-left'>
                    <img  alt='completed' className="partition-container-left-img" src={completed} />
                </div>
                <div className='partition-container-right'>
                    <div className='quiz-willstart make-white'>
                        <h4>Quiz Has Ended</h4>
                        {/* TODO: LEADERBOARD */}
                    </div>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className='quiz quiz-layout partition-container'>
                <div className='partition-container-left'>
                    <img  alt='wait' className="partition-container-left-img" src={wait} />
                </div>
                <div className='partition-container-right'>
                    <div className='quiz-willstart make-white'>
                        {start ? (
                            <>
                                {quiz.quizDetails.inviteOnly ? (
                                    <>
                                        {showOTPBox ? (
                                            <>
                                                <Form.Control 
                                                    placeholder='Enter OTP'
                                                    value={otp}
                                                    name="otp"
                                                    onChange={(event) => {
                                                        setOtp(event.target.value);
                                                    }}
                                                    className='quiz-inputs'
                                                    type="text"
                                                />
                                                <Button
                                                    className="customButton"
                                                    onClick={() => verifyOTP()}
                                                >
                                                    Enter
                                                </Button>
                                            </>
                                        ): (
                                            <>
                                                <Form.Control 
                                                    placeholder='Enter Your Email'
                                                    value={userName}
                                                    name="userName"
                                                    onChange={(event) => {
                                                        setUserName(event.target.value);
                                                    }}
                                                    className='quiz-inputs'
                                                    type="email"
                                                />
                                                <Button
                                                    className="customButton"
                                                    onClick={() => verifyEmail()}
                                                >
                                                    Verify
                                                </Button>
                                            </>
                                        )}
                                    </>
                                ):(
                                    <>
                                        <Form.Control 
                                            placeholder='Enter Your Name'
                                            value={userName}
                                            name="userName"
                                            onChange={(event) => {
                                                setUserName(event.target.value);
                                            }}
                                            className='quiz-inputs'
                                        />
                                        <Button
                                            variant="primary"
                                            className="customButton"
                                            onClick={() => {
                                                setShowQuestion(true);
                                            }}
                                        >
                                            Enter
                                        </Button>
                                    </>
                                )}
                            </>
                        ):(
                            <>
                                <h4>Quiz Will End At</h4>
                                <h5><Moment local>{endTime}</Moment></h5>
                                <h4>Quiz Duration (hh:mm:ss)</h4>
                                <h5>{duration}</h5>
                                <Button
                                    className="customButton"
                                    onClick={() => {
                                        setStart(true);
                                    }}
                                >
                                    Start Quiz
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}

export default Quiz