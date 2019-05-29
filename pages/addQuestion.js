import React from 'react'

import { ADD_QUESTION_REQUEST } from '../reducers/question'
import EditFrom from '../components/EditForm'

const AddPart = ({ id }) => {
  return (
    <>
      <EditFrom id={id} action={ADD_QUESTION_REQUEST}/>
    </>
  )
}

AddPart.getInitialProps = ({ query }) => {
  return { id: query.id };
}

export default AddPart;