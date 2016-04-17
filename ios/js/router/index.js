import React, { AsyncStorage } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from '../features/menu';
import Nav from '../features/navigator';
import DICT from '../config/dict';
import styles from '../styles';

var Router = React.createClass({

    getInitialState() {
        return {
            user: ""
        }
    },

    componentDidMount() {
        this.initUser();
    },

    render() {
        var App = <Nav {...this.state}
                       initUser={ this.initUser } />;
        if (this.state.user != "") {
            App = <SideMenu {...this.state}
                            menu={ <Menu {...this.state}
                                         onItemSelected={ this.selected } /> }>
                    { App }
                  </SideMenu>;
        }
        return (
            App
        )
    },

    async _initUser() {
        try {
            let user = await AsyncStorage.getItem(DICT.LOGINKEY);
            if (user) {
                this.setState({
                    'user': JSON.parse(user)
                });
            }
        } catch ( err ) {
            console.error(err);
        }
    },

    initUser(user) {
        this._initUser().done();
    },

    async selected(module) {
        switch (module) {
        case 'logout':
            try {
                await AsyncStorage.removeItem(DICT.LOGINKEY);
                this.setState({
                    user: ""
                })
            } catch ( err ) {
                console.error(err);
            }
            break;
        default:
            break;
        }
    }

})

export default Router;