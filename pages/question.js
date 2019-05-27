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

  const addPart = (id) => {
    // Router.pushRoute(`/addPart/${id}`)
  }

  const onClick = (id) => {
    // Router.pushRoute(`/parts/${id}`)
  }

  const deletePart = async (id) => {
    // const result = await axios.delete(`/parts/${id}`);
    // if(result.status === 200, result.data.ok === true) {
    //   window.location.href = window.location.href
    // }
  }

  return (
    <>
    <button onClick={() => addPart(book.id)}>추가</button>
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
        {parts && parts.length > 0 && parts.map(part => {
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