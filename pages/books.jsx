import React from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import PropTypes from 'prop-types';

import { LOAD_BOOKS_REQUEST } from '../reducers/book';

const Books = ({ token }) => {
  const books = useSelector(state => state.book.books, []);

  const onClick = id => {
    Router.pushRoute(`/books/${id}`);
  };

  const addBook = () => {
    Router.pushRoute('/addBook');
  };

  const deleteBook = async id => {
    const result = await axios.delete(`/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if ((result.status === 200, result.data.ok === true)) {
      window.location.href = '/books';
    }
  };

  return (
    <>
      <button type="button" onClick={addBook}>
        추가
      </button>
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>content</th>
            <th>img</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.length > 0 &&
            books.map(book => (
              <tr key={book.id}>
                <td>
                  <button onClick={() => onClick(book.id)} type="button">
                    {book.id}
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => onClick(book.id)}>
                    {book.title}
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => onClick(book.id)}>
                    {book.content}
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => onClick(book.id)}>
                    <img
                      alt="bookImg"
                      src={book.imgUrl}
                      style={{ width: '50px', height: 'auto' }}
                    />
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => deleteBook(book.id)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

Books.propTypes = {
  token: PropTypes.string.isRequired,
};

Books.getInitialProps = async (ctx, token) => {
  ctx.store.dispatch({
    type: LOAD_BOOKS_REQUEST,
    data: {
      token,
    },
  });
  return { token };
};

export default Books;
