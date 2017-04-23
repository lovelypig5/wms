import React from 'react'
import { AsyncStorage } from 'react-native';
// import SideMenu from 'react-native-side-menu';
// import Menu from '../features/menu';
import Nav from '../features/navigator';
import Entry from '../features';
import LoginButton from '../features/login/button';
import DICT from '../config/dict';
import styles from '../styles';

class Router extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };

        this.initUser = this.initUser.bind(this);
    }

    componentDidMount() {
        this.initUser();
    }

    render() {
        var initialRoute = {
            title: '仓储管理系统',
            back: '',
            component: Entry,
            index: 0,
            right: LoginButton
        }

        return <Nav {...this.state} initialRoute={initialRoute} initUser={this.initUser} />
    }

    async initUser() {
        try {
            let user = await AsyncStorage.getItem(DICT.LOGINKEY);
            if (user) {
                this.setState({
                    user: JSON.parse(user)
                });
            }
        } catch (err) {
            console.error(err);
        }
    }

}

export default Router;
