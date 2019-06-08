import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

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
    const t = {
      target: {
        value: prevTitle,
      },
    };
    onChangeTitle(t);
    const c = {
      target: {
        value: prevContent,
      },
    };
    onChangeContent(c);
  }, [prevTitle, prevContent]);

  const onChangeFile = e => {
    [imageRef.current] = e.target.files;
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
          <label htmlFor="title">
            <Input
              id="title"
              name="title"
              value={title}
              onChange={onChangeTitle}
            />
            title
          </label>
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
        {!!imgUrl && <img alt="bookImg" src={imgUrl} width="200px" />}
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

LoginForm.defaultProps = {
  id: 0,
};

export default LoginForm;
