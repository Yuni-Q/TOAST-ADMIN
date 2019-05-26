import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import axios from 'axios';

import { LOAD_BOOKS_REQUEST } from '../reducers/book'

const Books = () => {
  const books = useSelector(state => state.book.books)

  const onClick = (id) => {
    Router.pushRoute(`/books/${id}`)
  }
  
  const addBook = () => {
    Router.pushRoute(`/addBook`)
  }

  const deleteBook = async (id) => {
    const result = await axios.delete(`/books/${id}`);
    console.log(result);
    if(result.status === 200, result.data.ok === true) {
      window.location.href = '/books'
    }
  }

  return (
    <>
      <button onClick={addBook}>추가</button>
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
          {books && books.map(book => {
            return (
              <tr key={book.id}>
                <td onClick={() => onClick(book.id)}>
                  {book.id}
                </td>
                <td onClick={() => onClick(book.id)}>
                  {book.title}
                </td>
                <td onClick={() => onClick(book.id)}>
                  {book.content}
                </td>
                <td onClick={() => onClick(book.id)}>
                  <img src={book.imgUrl} style={{ width: "50px", height: "auto" }} />
                </td>
                <td>
                  <button onClick={() => deleteBook(book.id)}>삭제</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

Books.getInitialProps = async (ctx, token) => {
  ctx.store.dispatch({
    type: LOAD_BOOKS_REQUEST,
    data: {
      token,
    }
  });
}

export default Books;