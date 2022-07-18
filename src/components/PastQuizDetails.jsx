import React, {useState, useEffect} from 'react'
import axios from "axios";
import {Table, Button} from "react-bootstrap"
import {IoArrowBackOutline} from "react-icons/io5"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Header from './Header';

function PastQuizDetails({id, setShowPast}) {

  const [quizData, setQuizData] = useState({
    player_info: {}
  });
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post("https://quizhub-api.herokuapp.com/quizinfo", {
        quiz_id: id
      })
      setQuizData(res.data);
      setLoading(false);
    } 
    fetchData();
  }, [])

  console.log(quizData);
  

  return (
    <>
      <Header />
      <div className='history'>
        <h1 className='history-heading'>Leaderboard</h1>
        {loading ? (
          <div className='make-white history-list'>
            <Skeleton count={10} /> 
          </div>
        ):(
          <>
            {Object.keys(quizData.player_info).length == 0 ? (
                <h5 className='createquiz-questions-length0' style={{"margin":"3% auto"}}>No Data To Display</h5>
            ):(
              <Table hover className='make-white history-list'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Player ID</th>
                    </tr>
                </thead>
                <tbody>
                  {Object.keys(quizData.player_info).map((key, index) => (
                    <tr>
                      <td className=''>
                        {quizData.player_info[key]?.name}
                      </td>
                      <td className=''>
                          {quizData.player_info[key].score}
                      </td>
                      <td className=''>
                          {key}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
        <Button
          onClick={() => {
            setShowPast(false);
          }}
          className="customButton"
        >
          <IoArrowBackOutline /> Go Back
        </Button>
      </div>
    </>
  )
}

export default PastQuizDetails