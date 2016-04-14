import React, { Navigator, TouchableOpacity, Text, View } from 'react-native';
import Login from '../login';
import styles from '../../styles';

var LoginButton = React.createClass({

    render() {
        return (
            <TouchableOpacity onPress={ this.login }
                              style={ styles.layout.button }>
              <Text style={ [styles.common.row, styles.layout.text] }>
                登录
              </Text>
            </TouchableOpacity>
        )
    },

    login() {
        var {navigator} = this.props;
        navigator.push({
            title: '登录',
            component: Login,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            index: 0
        })
    }

})

export default LoginButton;