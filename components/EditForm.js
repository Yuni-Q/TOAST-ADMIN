import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../common/customHooks'; // TODO: util 폴더로 옮기기

const LoginForm = ({ id, title: prevTitle, content: prevContent, action }) => {
  const [title, onChangeTitle] = useInput(prevTitle);
  const [content, onChangeContent] = useInput(prevContent);
  const { isAddingPost } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const title = {
      target: {
        value: prevTitle
      }
    }
    onChangeTitle(title)
    const content = {
      target: {
        value: prevContent
      }
    }
    onChangeContent(content)
  }, [prevTitle, prevContent])

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: action,
      data: {
        id,
        title,
        content,
      },
    });
  }, [title, content]);
  return (
    <>
      <Form onSubmit={onSubmitForm} style={{ padding: '10px' }}>
        <div>
          <label htmlFor="title">title</label>
          <br />
          <Input id="title" name="title" value={title} onChange={onChangeTitle} />
        </div>
        <div>
          <label htmlFor="content">content</label>
          <br />
          <Input id="content" name="content" value={content} onChange={onChangeContent} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button type="primary" htmlType="submit" loading={isAddingPost}>수정</Button>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
