import React, {useState, useEffect} from 'react'
import axios from "axios";
import {Table, Button, Container, Row, Col, Form} from "react-bootstrap"

function PastQuizDetails({id, setShowPast}) {

  const [quizData, setQuizData] = useState({
    player_info: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post("https://quizhub-api.herokuapp.com/quizinfo", {
        quiz_id: id
      })
      setQuizData(res.data);
    } 
    fetchData();
  }, [])

  console.log(quizData);
  

  return (
    <div className='history'>
      <h1 className='history-heading'>Leaderboard</h1>
      <Table hover className='make-white history-list'>
          <thead>
              <tr>
                  <th>Player ID</th>
                  <th>Score</th>
              </tr>
          </thead>
          <tbody>
            {Object.keys(quizData.player_info).map((key, index) => (
              <tr>
                <td className=''>
                    {key}
                </td>
                <td className=''>
                    {quizData.player_info[key].score}
                </td>
              </tr>
            ))}
          </tbody>
      </Table>
    </div>
  )
}

export default PastQuizDetails