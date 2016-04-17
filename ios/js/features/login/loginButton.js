import React, { AsyncStorage, Navigator, TouchableOpacity, Text, View } from 'react-native';
import Login from '../login';
import DICT from '../../config/dict';
import styles from '../../styles';

var LoginButton = React.createClass({

    render() {
        var right = <TouchableOpacity onPress={ this.login }
                                      style={ styles.layout.button }>
                      <Text style={ [styles.common.row, styles.layout.text] }>
                        登录
                      </Text>
                    </TouchableOpacity>;

        if (this.props.user) {
            right = <Text style={ [styles.common.row, styles.layout.text] }>
                      { this.props.user.name }
                    </Text>;
        }

        return (
            right
        )
    },

    login() {
        var {navigator} = this.props;
        navigator.push({
            title: '登录',
            component: Login,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            index: 1
        })
    }

})

export default LoginButton;