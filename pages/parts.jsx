import React from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import PropTypes from 'prop-types';

import {
  LOAD_BOOKS_REQUEST,
  LOAD_BOOK_REQUEST,
  EDIT_BOOK_REQUEST,
} from '../reducers/book';
import EditFrom from '../components/EditForm';

const Parts = ({ id, token }) => {
  const books = useSelector(state => state.book.books);
  const parts = useSelector(state => state.book.parts);
  const book =
    books &&
    books.length > 0 &&
    books.filter(b => {
      return b.id === parseInt(id, 10);
    })[0];

  const addPart = bookId => {
    Router.pushRoute(`/books/${bookId}/addPart`);
  };

  const onClick = partId => {
    Router.pushRoute(`/books/${book.id}/parts/${partId}`);
  };

  const deletePart = async partId => {
    const result = await axios.delete(`/parts/${partId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    if ((result.status === 200, result.data.ok === true)) {
      window.location.href = window.location.href;
    }
  };

  return (
    <>
      <button type="button" onClick={() => addPart(book.id)}>
        추가
      </button>
      <EditFrom
        id={book.id}
        title={book.title}
        content={book.content}
        imgUrl={book.imgUrl}
        action={EDIT_BOOK_REQUEST}
      />
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>content</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {parts &&
            parts.map(part => {
              return (
                <tr key={part.partId}>
                  <td>
                    <button type="button" onClick={() => onClick(part.partId)}>
                      {part.partId}
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => onClick(part.partId)}>
                      {part.partTitle}
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => onClick(part.partId)}>
                      {part.partContent}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deletePart(part.partId)}
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

Parts.propTypes = {
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

Parts.getInitialProps = (ctx, token) => {
  ctx.store.dispatch({
    type: LOAD_BOOKS_REQUEST,
    data: {
      token,
    },
  });
  ctx.store.dispatch({
    type: LOAD_BOOK_REQUEST,
    data: {
      id: ctx.query.id,
      token,
    },
  });
  return { id: ctx.query.id, token };
};

export default Parts;
