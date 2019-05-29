import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import axios from 'axios';

import { LOAD_QUESTIONS_REQUEST, EDIT_QUESTION_REQUEST, LOAD_QUESTION_REQUEST } from '../reducers/question'
import EditFrom from '../components/EditForm'

const Toasts = ({ bookId, partId, id, token }) => {
  const questions = useSelector(state => state.question.questions)
  const question = questions.length > 0 && questions.filter(question => {
    return question.id === parseInt(id, 10)
  })[0];
  const toasts = useSelector(state => state.question.toasts)

  // const addQuestion = (id) => {
  //   Router.pushRoute(`/addQuestion/${id}`)
  // }

  // const onClick = (id) => {
  //   Router.pushRoute(`/questions/${id}`)
  // }

  const deleteToast = async (id) => {
    try {
      const result = await axios.delete(`/toasts/${id}`, { headers: { authorization: `Bearer ${token}` } });
      if (result.status === 200, result.data.ok === true) {
        window.location.href = window.location.href
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* <button onClick={() => addQuestion(part.id)}>추가</button> */}
      <EditFrom id={question.id} title={question.title} content={question.content} action={EDIT_QUESTION_REQUEST} />
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>content</th>
          </tr>
        </thead>
        <tbody>
          {toasts && toasts.length > 0 && toasts.map(toast => {
            return (
              <tr key={toast.id}>
                <td onClick={() => onClick(toast.id)}>
                  {toast.id}
                </td>
                <td onClick={() => onClick(toast.id)}>
                  {toast.title}
                </td>
                <td onClick={() => onClick(toast.id)}>
                  {toast.content}
                </td>
                <td>
                  <button onClick={() => deleteToast(toast.id)}>삭제</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
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
  ctx.store.dispatch({
    type: LOAD_QUESTION_REQUEST,
    data: {
      token,
      id: ctx.query.id,
    }
  })
  return { bookId: ctx.query.bookId, partId: ctx.query.partId, id: ctx.query.id, token };
}

export default Toasts;
