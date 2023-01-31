import React, { Component } from 'react';
import './sidebar.scss';
import {connect} from 'react-redux';
import Logo from '../../assets/img/happy_children_logo'
import {  item } from './MenuItemData'
import { Menu, Layout } from 'antd';
import {ReactComponent as MenuShortLogo} from '../../assets/img/short_logo/Menu_short_logo.svg';
const { Sider } = Layout;

// import rootReducers from '../../store/reducers/rootReducers';
class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected : 0,
            collapsed : false,
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
    }

    handleSelect(e,index) {
        e.preventDefault();
        console.log('ok')
        this.setState({selected : index})
    }

    handleCollapse() {
        this.setState({collapsed : !this.state.collapsed})
    }

    render() {
        return (
            <>  
                <Sider className='sidebar' collapsible collapsed={this.state.collapsed} onCollapse={this.handleCollapse}>
                    <span className={this.state.collapsed ? 'short_logo' : 'logo'}>
                        {this.state.collapsed ?<MenuShortLogo/> : <Logo /> }
                    </span>
                    <div className="menu">
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            inlineCollapsed={this.state.collapsed}
                            items={item}
                        />
                    </div>
                </Sider>
            </>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(Sidebar);
