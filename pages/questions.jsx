import React from 'react';
import useSelector from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import PropTypes from 'prop-types';

import {
  LOAD_PARTS_REQUEST,
  LOAD_PART_REQUEST,
  EDIT_PART_REQUEST,
} from '../reducers/part';
import EditFrom from '../components/EditForm';

const Questions = ({ bookId, id, token }) => {
  const parts = useSelector(state => state.part.parts);
  const part =
    parts &&
    parts.length > 0 &&
    parts.filter(p => {
      return p.id === parseInt(id, 10);
    })[0];
  const questions = useSelector(state => state.part.questions);

  const addQuestion = partId => {
    Router.pushRoute(`/books/${bookId}/parts/${partId}/addQuestion`);
  };

  const onClick = questionId => {
    Router.pushRoute(
      `/books/${bookId}/parts/${part.id}/questions/${questionId}`,
    );
  };

  const deleteQuestion = async questionId => {
    try {
      const result = await axios.delete(`/questions/${questionId}`, {
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
      <button type="button" onClick={() => addQuestion(part.id)}>
        추가
      </button>
      <EditFrom
        id={part.id}
        title={part.title}
        content={part.content}
        action={EDIT_PART_REQUEST}
      />
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>content</th>
          </tr>
        </thead>
        <tbody>
          {questions &&
            questions.length > 0 &&
            questions.map(question => {
              return (
                <tr key={question.id}>
                  <td>
                    <button type="button" onClick={() => onClick(question.id)}>
                      {question.title}
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => onClick(question.id)}>
                      {question.id}
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => onClick(question.id)}>
                      {question.content}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteQuestion(question.id)}
                    >
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

Questions.propTypes = {
  bookId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

Questions.getInitialProps = async (ctx, token) => {
  ctx.store.dispatch({
    type: LOAD_PARTS_REQUEST,
    data: {
      token,
    },
  });
  ctx.store.dispatch({
    type: LOAD_PART_REQUEST,
    data: {
      token,
      id: ctx.query.id,
    },
  });
  return { bookId: ctx.query.bookId, id: ctx.query.id, token };
};

export default Questions;
