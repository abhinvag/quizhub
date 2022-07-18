import React, {useState, useEffect, useRef} from 'react'
import Moment from 'react-moment';
import wait from "../assets/wait.svg"
import completed from "../assets/completed.svg"
import {Button, Form} from "react-bootstrap"
import {GrFormNextLink} from "react-icons/gr"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {nanoid} from "nanoid";
import {Redirect} from "react-router-dom";
import axios from "axios";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Header from '../components/Header';

function Quiz(props) {

    const [quiz, setQuiz] = useState();

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [duration, setDuration] = useState();
    const [counter, setCounter] = useState(0);
    const [start, setStart] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [userName, setUserName] = useState("");
    const [showOTPBox, setShowOTPBox] = useState(false);
    const [otp, setOtp] = useState();
    const [sendedOtp, setSendedOtp] = useState();
    const [totalScore, setTotalScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchData(){
            try{
                let res = await axios.post(`https://quizhub-api.herokuapp.com/questions`, {
                    quiz_id: props.match.params.id
                })
                console.log(res.data);
                if(res.data.quizDetails !== null){
                    const tempq = {
                        id:props.match.params.id,
                        quizDetails: res.data.quizDetails,
                        quizQuestions: res.data.quizQuestions
                    }
                    setQuiz(tempq);
                    setStartTime(new Date(res.data.quizDetails.startDate + " " + res.data.quizDetails.startTime))
                    setEndTime(new Date(res.data.quizDetails.endDate + " " + res.data.quizDetails.endTime))
                    setDuration(res.data.quizDetails.duration);
                    localStorage.setItem("quiz", JSON.stringify(tempq));
                }
                else{
                    toast.error("Invalid Quiz ID");
                    setEndTime(new Date());
                }

                setLoading(false);
            }
            catch(e){
                console.log(e);
            }
        }

        fetchData();

        const interval = setInterval(() => {
            setCounter(prev => prev+1)
        }, 1000)

        return () => clearInterval(interval);

    }, []);

    const verifyEmail = () => {
        var idx = quiz.quizDetails.invitedEmails.indexOf(userName);
        if(idx == -1){
            toast.error("You Are Not Allowed To Attend This Quiz !!");
        }
        else{
            // TODO: SEND OTP  - setSendedOtp
            //setShowOTPBox(true);
            toast.info("Feature In Development");
        }
    }

    //console.log(counter);

    const verifyOTP = () => {
        if(otp == sendedOtp){
            setShowQuestion(true)
        }
        else{
            toast.error("OTP Invalid");
        }
    }

    const calculateScore = async () => {
        let user = localStorage.getItem("quizgiver");
        if(user != undefined && user != null){
            user = JSON.parse(user);
            console.log(user);
            console.log(quiz.id);
            console.log(user.prevQuizes[quiz.id]);
            if(user.prevQuizes[quiz.id] != undefined){
                console.log(user);
                try {
                    const obj = {
                        quiz_id: quiz.id,
                        player_id: user.id
                    }
                    console.log(obj);
                    const res = await axios.post("https://quizhub-api.herokuapp.com/score", obj);
                    console.log(res.data);
                    if(res.data.success === true){
                        setTotalScore(res.data.score);
                        setShowScore(true);
                    }
                    else toast.error("Some Error Occured In Fetching Your Score");
                } catch (error) {
                    console.log(error);
                }
            }
            else{
                setTotalScore(-1);
                setShowScore(true);
            }
        }
    }

    const startHourRemaining =  parseInt((Date.parse(startTime)-Date.now())/(3600000))
    const startMinRemaining  = parseInt((Date.parse(startTime)-Date.now())/(1000*60))-(startHourRemaining*60);
    const startSecondRemaining = parseInt(((Date.parse(startTime)-Date.now())/1000)-(startHourRemaining*60*60 + startMinRemaining*60))

    const endHourRemaining =  parseInt((Date.parse(endTime)-Date.now())/(3600000))
    const endMinRemaining  = parseInt((Date.parse(endTime)-Date.now())/(1000*60))-(endHourRemaining*60);
    const endSecondRemaining = parseInt(((Date.parse(endTime)-Date.now())/1000)-(endHourRemaining*60*60 + endMinRemaining*60))
   

    if(loading){
        return (
            <>
                <Header />
                <div className='quiz quiz-layout partition-container'>
                    <div className='partition-container-left'>
                        <img  alt='wait' className="partition-container-left-img" src={wait} />
                    </div>
                    <div className='partition-container-right'>
                        <div className='quiz-willstart make-white'>
                            <Skeleton count={7} />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if(showQuestion){

        let user;

        user = localStorage.getItem("quizgiver");

        if(user !== "undefined" && user !== null){
            user = JSON.parse(user);
            if(user.quizid != quiz.id){
                if(user.prevQuizes[quiz.id] != undefined){ // we have previous end time
                    user = {
                        id: user.id,
                        name: userName,
                        quizid: quiz.id,
                        prevQuizes:user.prevQuizes,
                        quizEndTimeForUser: user.prevQuizes[quiz.id]
                    }
                }
                else{ // we do not have previous end time, calculating new 
                    const d = duration.split(":");
                    const dInMs = d[0]*3600000 + d[1]*60000 + d[2]*1000;
                    const quizEndTimeForUser = new Date(Math.min(Date.now()+dInMs, Date.parse(endTime)));
                    user.prevQuizes[quiz.id] = quizEndTimeForUser;
                    user = {
                        id: user.id,
                        name: userName,
                        quizid: quiz.id,
                        prevQuizes:user.prevQuizes,
                        quizEndTimeForUser:quizEndTimeForUser
                    }
                }
                localStorage.setItem("quizgiver", JSON.stringify(user));
            }
        }
        else{
            // we do not have any user info
            const d = duration.split(":");
            const dInMs = d[0]*3600000 + d[1]*60000 + d[2]*1000;
            const quizEndTimeForUser = new Date(Math.min(Date.now()+dInMs, Date.parse(endTime)));
            let prevQuizes = {};
            prevQuizes[quiz.id]=quizEndTimeForUser
            user = {
                id: nanoid(),
                name: userName,
                quizid: quiz.id,
                prevQuizes:prevQuizes,
                quizEndTimeForUser:quizEndTimeForUser
            }
            localStorage.setItem("quizgiver", JSON.stringify(user));
        }

        return <Redirect to="/givequiz" />

    }
    else if(Date.now() < Date.parse(startTime)){
        return (
            <>
                <Header />
                <div className='quiz quiz-layout partition-container'>
                    <div className='partition-container-left'>
                        <img  alt='wait' className="partition-container-left-img" src={wait} />
                    </div>
                    <div className='partition-container-right'>
                        <div className='quiz-willstart make-white'>
                            <h4>Quiz Will Start In</h4>
                            <h5>{startHourRemaining}:{startMinRemaining}:{startSecondRemaining}</h5>
                            <h4>Quiz Duration (hh:mm:ss)</h4>
                            <h5>{duration}</h5>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else if(Date.now() > Date.parse(endTime)){
        return (
            <>
                <Header />
                <div className='quiz quiz-layout partition-container'>
                    <div className='partition-container-left'>
                        <img  alt='completed' className="partition-container-left-img" src={completed} />
                    </div>
                    <div className='partition-container-right'>
                        <div className='quiz-willstart make-white'>
                            <h4>Quiz Has Ended</h4>
                            {showScore ? (
                                <>
                                {totalScore == -1 ? (
                                    <h5>Not Attempted</h5>
                                ):(
                                    <h5>Your Score: {totalScore}</h5>
                                )}
                                </>
                            ):(
                                <Button
                                    className='customButton-outline'
                                    onClick={() => calculateScore()}
                                >
                                    Fetch Score
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else{
        return (
            <>
                <Header />
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
                                <h4>Quiz Will End In</h4>
                                <h5>{endHourRemaining}:{endMinRemaining}:{endSecondRemaining}</h5>
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
            </>
        )
    }
}

export default Quiz