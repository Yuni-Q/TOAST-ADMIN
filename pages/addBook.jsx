import React from 'react';

import { ADD_BOOK_REQUEST } from '../reducers/book';
import EditFrom from '../components/EditForm';

const AddBook = () => (
  <>
    <EditFrom action={ADD_BOOK_REQUEST} />
  </>
);

export default AddBook;
