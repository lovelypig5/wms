import React, { AsyncStorage } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from '../features/menu';
import Home from '../features/home';
import Goods from '../features/goods';
import DICT from '../config/dict';
import styles from '../styles';

var Router = React.createClass({

    getInitialState() {
        return {
            user: "",
            component: Home
        }
    },

    componentDidMount() {
        this.initUser();
    },

    render() {
        console.log('run Router');
        var Component = this.state.component;
        if (this.state.user) {
            Component = Goods;
        }
        var App = <Component user={ this.state.user }
                             initUser={ this.initUser }
                             changeModule={ this.changeModule } />;
        if (this.state.user) {
            App = <SideMenu user={ this.state.user }
                            menu={ <Menu user={ this.state.user }
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
        case 'goods':
            this.setState({
                component: Goods
            })
            break;
        default:
            break;
        }
    }

})

export default Router;