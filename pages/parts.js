import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import Router from 'next/router'

import { LOAD_BOOKS_REQUEST, LOAD_BOOK_REQUEST, EDIT_BOOK_REQUEST } from '../reducers/book'
import EditFrom from '../components/EditForm'

const Parts = ({ id }) => {
  const books = useSelector(state=> state.book.books);
  const book = books.length > 0 && books.filter(book=> {
    return book.id === parseInt(id, 10)
  })[0];
  
  const parts = useSelector(state=> state.book.parts)
  console.log(parts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_BOOKS_REQUEST,
      data: {
        id
      }
    });
    dispatch({
      type: LOAD_BOOK_REQUEST,
      data: {
        id
      }
    });
  }, [])
  return (
    <>
    <EditFrom id={book.id} title={book.title} content={book.content} action={EDIT_BOOK_REQUEST}/>
    <table border="1">
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>content</th>
        </tr>
      </thead>
      <tbody>
        {parts.map(part => {
          return (
            <tr key={part.partId} onClick={() => onClick(part.partId)}>
              <td>
                {part.partId}
              </td>
              <td>
                {part.partTitle}
              </td>
              <td>
                {part.partContent}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}

Parts.getInitialProps = ({ query }) => {
  return { id: query.id };
}

export default Parts;