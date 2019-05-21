import React from 'react'

import { ADD_BOOK_REQUEST } from '../reducers/book'
import EditFrom from '../components/EditForm'

const Parts = ({ id }) => {
  return (
    <>
      <EditFrom action={ADD_BOOK_REQUEST}/>
    </>
  )
}

Parts.getInitialProps = ({ query }) => {
  return { id: query.id };
}

export default Parts;