import React from 'react';

import { ADD_PART_REQUEST } from '../reducers/part';
import EditFrom from '../components/EditForm';

const AddPart = ({ id }) => {
  return (
    <>
      <EditFrom id={id} action={ADD_PART_REQUEST} />
    </>
  );
};

AddPart.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default AddPart;
