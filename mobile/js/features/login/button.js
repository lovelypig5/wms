import React from 'react';
import { Alert, AsyncStorage, Navigator, TouchableOpacity, Text } from 'react-native';
import Login from '../login';
import API from '../../config/api';
import DICT from '../../config/dict';
import styles from '../../styles';

class LoginButton extends React.Component {

    constructor(props) {
        super(props);

        this.dologin = this.dologin.bind(this);
        this.logout = this.logout.bind(this);
    }

    render() {
        var Right = <TouchableOpacity onPress={ this.dologin }
                                      style={ styles.layout.button }>
                      <Text style={ [styles.common.row, styles.layout.text] }>
                        登录
                      </Text>
                    </TouchableOpacity>;

        if (this.props.user) {
            Right = <TouchableOpacity onPress={ this.logout }
                                      style={ styles.layout.button }>
                      <Text style={ [styles.common.row, styles.layout.text] }>
                        注销
                      </Text>
                    </TouchableOpacity>;
        }

        return Right
    }

    dologin() {
        this.props.navigator.push({
            title: '登录',
            component: Login,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            index: 1
        })
    }

    async logout() {
        try {
            var response = await fetch(API.logout, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            var status = response.status;
            var responseText = await response.text();
            switch (status) {
                case 200:
                    try {
                        await AsyncStorage.removeItem(DICT.LOGINKEY);
                        await this.props.initUser(responseText);
                    } catch (error) {
                        console.error(error);
                        Alert.alert('内部错误', '内部错误，即将退出!');
                        return;
                    }
                    this.props.navigator.pop();
                    break;
                default:
                    Alert.alert('注销失败', responseText || '服务器内部错误');
                    break;
            }
        } catch (error) {
            Alert.alert('注销失败', '无法连接到服务器');
        }
    }

}

export default LoginButton;
