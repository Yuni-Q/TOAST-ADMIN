import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import axios from 'axios';

import { LOAD_BOOKS_REQUEST, LOAD_BOOK_REQUEST, EDIT_BOOK_REQUEST } from '../reducers/book'
import EditFrom from '../components/EditForm'

const Question = ({ bookId, partId }) => {
  const parts = [];
  useEffect(() => {
    
  }, [])

  const addPart = (id) => {
    Router.pushRoute(`/addPart/${id}`)
  }

  const onClick = (id) => {
    Router.pushRoute(`/parts/${id}`)
  }

  const deletePart = async (id) => {
    const result = await axios.delete(`/parts/${id}`);
    console.log(result);
    if(result.status === 200, result.data.ok === true) {
      window.location.href = window.location.href
    }
  }

  return (
    <>
    <button onClick={() => addPart(book.id)}>추가</button>
    {/* <EditFrom id={part.id} title={part.title} content={part.content} action={EDIT_PART_REQUEST}/> */}
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
            <tr key={part.partId}>
              <td onClick={() => onClick(part.partId)}>
                {part.partId}
              </td>
              <td onClick={() => onClick(part.partId)}>
                {part.partTitle}
              </td>
              <td onClick={() => onClick(part.partId)}>
                {part.partContent}
              </td>
              <td>
                  <button onClick={() => deletePart(part.partId)}>삭제</button>
                </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}

Question.getInitialProps = ({ query }) => {
  console.log(query);
  return { bookId: query.bookId, partId: query.partId };
}

export default Question;