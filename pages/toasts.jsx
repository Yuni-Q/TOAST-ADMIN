import React from 'react';
import useSelector from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import {
  LOAD_QUESTIONS_REQUEST,
  EDIT_QUESTION_REQUEST,
  LOAD_QUESTION_REQUEST,
} from '../reducers/question';
import EditFrom from '../components/EditForm';

const Toasts = ({ id, token }) => {
  const questions = useSelector(state => state.question.questions);
  const question =
    questions &&
    questions.length > 0 &&
    questions.filter(q => {
      return q.id === parseInt(id, 10);
    })[0];
  const toasts = useSelector(state => state.question.toasts);

  const deleteToast = async toastId => {
    try {
      const result = await axios.delete(`/toasts/${toastId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if ((result.status === 200, result.data.ok === true)) {
        window.location.href = window.location.href;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <button onClick={() => addQuestion(part.id)}>추가</button> */}
      <EditFrom
        id={question.id}
        title={question.title}
        content={question.content}
        action={EDIT_QUESTION_REQUEST}
      />
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>content</th>
            <th>keepsCount</th>
            <th>alertCount</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {toasts &&
            toasts.length > 0 &&
            toasts.map(toast => {
              return (
                <tr key={toast.id}>
                  <td>{toast.id}</td>
                  <td>{toast.title}</td>
                  <td>{toast.content}</td>
                  <td>{toast.keepsCount}</td>
                  <td>{toast.alertCount}</td>
                  <td>
                    <button type="button" onClick={() => deleteToast(toast.id)}>
                      삭제
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

Toasts.propTypes = {
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

Toasts.getInitialProps = async (ctx, token) => {
  ctx.store.dispatch({
    type: LOAD_QUESTIONS_REQUEST,
    data: {
      token,
    },
  });
  ctx.store.dispatch({
    type: LOAD_QUESTION_REQUEST,
    data: {
      token,
      id: ctx.query.id,
    },
  });
  return {
    bookId: ctx.query.bookId,
    partId: ctx.query.partId,
    id: ctx.query.id,
    token,
  };
};

export default Toasts;
