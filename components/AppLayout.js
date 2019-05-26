
import * as React from "react";
import Head from "next/head";
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Breadcrumb } from 'antd';

import { Link } from '../routes';
import { canUseDOM } from '../pages/_app';
import { LOAD_USER_REQUEST } from '../reducers/user';
import Router from 'next/router'
import { getCookie } from "../common/cookie";


const { Header, Content, Footer } = Layout;


const AppLayout = (props) => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  if(canUseDOM() && !getCookie('token') && window.location.pathname !== '/') {
    Router.push('/')
  }

  if (canUseDOM() && getCookie('token') && (!me || !me.nickName)) {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  return (
    <>
      <Head>
        <title>Yuni-Q</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.js"></script>
      </Head>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="0">
              <Link route={"/"}><a>index</a></Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link route={"/books"}><a>book</a></Link>
            </Menu.Item>
            {/* <Menu.Item key="2">
              <Link route={"/parts"}><a>part</a></Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link route={"/questions"}><a>question</a></Link>
            </Menu.Item> */}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{props.children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </>
  );
}

export default AppLayout