import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../components/LoginForm'

const Index = () => {
  const { me } = useSelector(state=> state.user);
  console.log(99,me);
  return (
    me ? (
      <div>{me.nickName}님 안녕하세요 !!</div>
    ) : (
      <LoginForm />
    )
  )
};

export default Index;
