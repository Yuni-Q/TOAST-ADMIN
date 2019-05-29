import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../components/LoginForm'

const Index = () => {
  const { me } = useSelector(state=> state.user);
  const onClick = () => {
    document.cookie = 'token' + "=" + ' ' + "; expires=" + new Date().toGMTString();
    window.location.href = window.location.href;
  }
  return (
    me ? (
      <>
        <div>{me.nickName}님 안녕하세요 !!</div>
        <button onClick={onClick}>로그아웃</button>
      </>
    ) : (
      <LoginForm />
    )
  )
};

export default Index;
