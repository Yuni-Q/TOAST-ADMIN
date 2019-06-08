import * as React from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

import Router from 'next/router';
import { Link } from '../routes';
import { canUseDOM } from '../common/canUesDOM';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { getCookie } from '../common/cookie';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  if (canUseDOM() && !getCookie('token') && window.location.pathname !== '/') {
    Router.push('/');
  }

  if (canUseDOM() && getCookie('token') && (!me || !me.nickName)) {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  return (
    <>
      <Head>
        <title>TOAST</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.js" />
      </Head>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <div>
            <span>
              <Link route="/" href="/">
                index
              </Link>
            </span>
            <span style={{ margin: '0px 0px 0px 16px' }}>
              <Link route="/books" href="/books">
                book
              </Link>
            </span>
          </div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AppLayout;
