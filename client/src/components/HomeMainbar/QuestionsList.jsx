import React from 'react'
import Question from './Question'

const QuestionsList = ({questionList}) => {
  return (
    <>
    {
        questionList.map((question)=>(
            <Question question={question} key={question.id}/>
        ))
    }
    </>
  )
}

export default QuestionsList
