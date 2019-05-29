import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import axios from 'axios';

import { LOAD_PARTS_REQUEST, LOAD_PART_REQUEST, EDIT_PART_REQUEST } from '../reducers/part'
import EditFrom from '../components/EditForm'

const Question = ({ id }) => {
  const parts = useSelector(state => state.part.parts)
  const part = parts.length > 0 && parts.filter(part => {
    return part.id === parseInt(id, 10)
  })[0];
  const questions = useSelector(state => state.part.questions)

  const addQuestion = (id) => {
    Router.pushRoute(`/addQuestion/${id}`)
  }

  const onClick = (id) => {
    // Router.pushRoute(`/parts/${id}`)
  }

  const deleteQuestion = async (id) => {
    // const result = await axios.delete(`/parts/${id}`);
    // if(result.status === 200, result.data.ok === true) {
    //   window.location.href = window.location.href
    // }
  }

  return (
    <>
    <button onClick={() => addQuestion(part.id)}>추가</button>
    <EditFrom id={part.id} title={part.title} content={part.content} action={EDIT_PART_REQUEST}/>
    <table border="1">
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>content</th>
        </tr>
      </thead>
      <tbody>
        {questions && questions.length > 0 && questions.map(question => {
          return (
            <tr key={question.id}>
              <td onClick={() => onClick(question.id)}>
                {question.id}
              </td>
              <td onClick={() => onClick(question.id)}>
                {question.title}
              </td>
              <td onClick={() => onClick(question.id)}>
                {question.content}
              </td>
              <td>
                  <button onClick={() => deleteQuestion(question.id)}>삭제</button>
                </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}

Question.getInitialProps = async (ctx, token) => {
  ctx.store.dispatch({
    type: LOAD_PARTS_REQUEST,
    data: {
      token,
    }
  });
  ctx.store.dispatch({
    type: LOAD_PART_REQUEST,
    data: {
      token,
      id: ctx.query.id,
    }
  })
  return { id: ctx.query.id };
}

export default Question;