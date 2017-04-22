import React from 'react'
import { AsyncStorage } from 'react-native';
// import SideMenu from 'react-native-side-menu';
import Menu from '../features/menu';
import Home from '../features/home';
import Goods from '../features/goods';
import DICT from '../config/dict';
import styles from '../styles';

class Router extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
            user: this.props.user,
            component: Home
        }
    }

    render() {
        var Component = this.state.component;
        if (this.state.user) {
            Component = Goods;
        }
        var App = <Component {...this.props} changeModule={ this.changeModule } />
        if (this.state.user) {
            App = <SideMenu user={ this.props.user }
                            menu={ <Menu user={ this.state.user } onItemSelected={ this.selected } /> }>{ App }
                  </SideMenu>
        }

        return App
    }

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

}

export default Router;