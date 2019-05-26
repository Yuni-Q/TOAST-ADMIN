import React, { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../common/customHooks'; // TODO: util 폴더로 옮기기
import { LOG_IN_REQUEST } from '../reducers/user';

const LoginForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { isLoggingIn, me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        email,
        password,
      },
    });
  }, [email, password]);

  return (
    <Form onSubmit={onSubmitForm} style={{ padding: '10px' }}>
      <div>
        <label htmlFor="email">아이디</label>
        <br />
        <Input id="email" name="email" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <br />
        <Input id="password" name="password" value={password} onChange={onChangePassword} type="password" required />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
      </div>
    </Form>
  );
};

export default LoginForm;
