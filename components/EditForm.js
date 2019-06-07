import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../common/customHooks'; // TODO: util 폴더로 옮기기

const LoginForm = ({
  id,
  title: prevTitle,
  content: prevContent,
  imgUrl,
  action,
}) => {
  const [title, onChangeTitle] = useInput(prevTitle);
  const [content, onChangeContent] = useInput(prevContent);
  const imageRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const title = {
      target: {
        value: prevTitle,
      },
    };
    onChangeTitle(title);
    const content = {
      target: {
        value: prevContent,
      },
    };
    onChangeContent(content);
  }, [prevTitle, prevContent]);

  const onChangeFile = e => {
    imageRef.current = e.target.files[0];
  };

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      const image = imageRef.current;
      dispatch({
        type: action,
        data: {
          id,
          title,
          content,
          image,
        },
      });
    },
    [title, content, imageRef.current],
  );
  return (
    <>
      <Form onSubmit={onSubmitForm} style={{ padding: '10px' }}>
        <div>
          <label htmlFor="title">title</label>
          <br />
          <Input
            id="title"
            name="title"
            value={title}
            onChange={onChangeTitle}
          />
        </div>
        <div>
          <label htmlFor="content">content</label>
          <br />
          <Input
            id="content"
            name="content"
            value={content}
            onChange={onChangeContent}
          />
        </div>
        <div>
          <label htmlFor="img">img</label>
          <br />
          <Input id="img" name="img" type="file" onChange={onChangeFile} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button type="primary" htmlType="submit">
            수정
          </Button>
        </div>
        {!!imgUrl && <img src={imgUrl} width="200px" />}
      </Form>
    </>
  );
};

export default LoginForm;
