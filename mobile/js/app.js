import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import DICT from './config/dict';
import Router from './router';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            user: ''
        };

        this.initUser = this.initUser.bind(this);
    }

    componentDidMount() {
        this.initUser();
    }

    render() {
        return (
            <Router {...this.state} initUser={this.initUser}/>
        );
    }

    async initUser() {
        try {
            let user = await AsyncStorage.getItem(DICT.LOGINKEY);
            if (user) {
                this.setState({
                    'user': JSON.parse(user)
                });
            }
        } catch (err) {
            console.error(err);
        }
    }
}

AppRegistry.registerComponent('wms', () => App);
