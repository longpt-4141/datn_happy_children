import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import { Layout, Breadcrumb } from 'antd';
import PrivateRoute from '../routes/PrivateRoute';

const { Footer, Content} = Layout;
const WithAppFrame = () => {
    console.log('with-app-frame')
    return (
        <>
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
                    }}>
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
                            padding: '0px 12px 0px 12px',
                            minHeight: 360,
                            background: "transparent",
                        }}
                        >
                            {/* inner container */}
                                <PrivateRoute/>
                            {/* close inner container */}
                        </div>
                    </Content>
                      {/* close Container */}
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
        </>
    );
}

export default WithAppFrame;
