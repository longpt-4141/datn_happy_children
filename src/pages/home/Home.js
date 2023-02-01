import React, { Component } from 'react';
import './home.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Breadcrumb, Layout } from 'antd';
const { Content, Footer} = Layout;
class Home extends Component {
    render() {
        return (
            <Layout
                style={{
                width: "100%",
                minHeight: "100vh",
                background: "transparent",
                overflow: "auto",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                }}
            >
                <Sidebar />
                <Layout className="site-layout">
                    {/* Header */}
                    <Navbar/>
                    {/* Container */}
                    <Content
                        style={{
                        margin: "0 16px",
                        }}
                    >
                        <Breadcrumb
                        style={{
                            margin: "16px 0",
                        }}
                        >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: "transparent",
                        }}
                        >
                        Bill is a cat.
                        </div>
                    </Content>
                    <Footer
                        style={{
                        textAlign: "left",
                        background: "transparent",
                        }}
                    >
                        Powered by <a href="https://www.facebook.com/profile.php?id=100004906634749">Pham Thanh Long</a>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Home;
