import React from 'react';
import PropTypes from 'prop-types';

import { ADD_QUESTION_REQUEST } from '../reducers/question';
import EditFrom from '../components/EditForm';

const AddPart = ({ id }) => (
  <>
    <EditFrom id={id} action={ADD_QUESTION_REQUEST} />
  </>
);

AddPart.propTypes = {
  id: PropTypes.number.isRequired,
};

AddPart.getInitialProps = ({ query }) => ({ id: query.id });

export default AddPart;
