import React, { Navigator, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from '../features/menu';
import Nav from '../features/navigator';
import styles from '../styles';

var Router = React.createClass({

    render() {
        return (
            <SideMenu menu={ <Menu/> }>
              <Nav/>
            </SideMenu>
        )
    }

})

export default Router;