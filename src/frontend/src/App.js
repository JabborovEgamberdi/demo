import {useEffect, useState} from "react";
import {getAllStudents} from "./Client";
import {Breadcrumb, Layout, Menu, Table, Spin, Empty} from "antd";

import './App.css';
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';

const {
    Header,
    Content,
    Footer,
    Sider
} = Layout;
const {SubMenu} = Menu;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];

function App() {

    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchStudents = () =>
        getAllStudents()
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            })
            .finally(() => {
                setFetching(false)
            })

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents()
            .then();
    }, []);

    const renderStudents = () => {

        if (fetching) {
            return <Spin/>
        }

        if (students == null || students.length <= 0) {
            return <Empty/>;
        }

        return <Table
            dataSource={students}
            columns={columns}
            bordered
            title={() => 'Students'}
            pagination={{pageSize: 10}}
            scroll={{y: 350}}
            rowKey={(student) => student.id}
        />;
    }

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>

        <Layout className="site-layout">
            <Header className="site-layout-background" style={{
                padding: 0,
                // background: colorBgContainer,
            }}
            />
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                From Friends © 2023 Created by Egamberdi
            </Footer>
        </Layout>
    </Layout>
}

export default App;