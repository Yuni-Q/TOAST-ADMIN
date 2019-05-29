import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import axios from 'axios';

import { LOAD_QUESTIONS_REQUEST, EDIT_QUESTION_REQUEST } from '../reducers/question'
import EditFrom from '../components/EditForm'

const Toasts = ({ bookId, partId, id, token }) => {
  const questions = useSelector(state => state.question.questions)
  const question = questions.length > 0 && questions.filter(question => {
    return question.id === parseInt(id, 10)
  })[0];

  // const addQuestion = (id) => {
  //   Router.pushRoute(`/addQuestion/${id}`)
  // }

  // const onClick = (id) => {
  //   Router.pushRoute(`/questions/${id}`)
  // }

  // const deleteQuestion = async (id) => {
  //   console.log('112323');
  //   try {
  //   const result = await axios.delete(`/questions/${id}`, { headers: {authorization: `Bearer ${token}`}});
  //   if(result.status === 200, result.data.ok === true) {
  //     window.location.href = window.location.href
  //   }
  // } catch(error) {
  //   console.log(error);
  // }
  // }

  return (
    <>
    {/* <button onClick={() => addQuestion(part.id)}>추가</button> */}
    <EditFrom id={question.id} title={question.title} content={question.content} action={EDIT_QUESTION_REQUEST}/>
    {/* <table border="1">
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>content</th>
        </tr>
      </thead>
      <tbody> */}
        {/* {questions && questions.length > 0 && questions.map(question => {
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
        })} */}
      {/* </tbody>
    </table> */}
    </>
  )
}

Toasts.getInitialProps = async (ctx, token) => {
  console.log('ctx', ctx.store);
  ctx.store.dispatch({
    type: LOAD_QUESTIONS_REQUEST,
    data: {
      token,
    }
  });
  // ctx.store.dispatch({
  //   type: LOAD_PART_REQUEST,
  //   data: {
  //     token,
  //     id: ctx.query.id,
  //   }
  // })
  return { bookId: ctx.query.bookId, partId: ctx.query.partId, id: ctx.query.id, token };
}

export default Toasts;