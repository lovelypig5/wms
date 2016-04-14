import React, { AsyncStorage, Alert, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import Welcome from '../welcome';
import DICT from '../../config/dict';
import API from '../../config/api';
import styles from '../../styles';

var Login = React.createClass({

    getInitialState() {
        return {
            name: "",
            password: ""
        }
    },

    render() {
        return (
            <View style={ styles.common.container }>
              <View style={ styles.common.row }>
                <Text style={ styles.login.label }>
                  用户名
                </Text>
                <TextInput placeholder="请输入用户名"
                           onChangeText={ this.changeName }
                           value={ this.state.name }
                           style={ styles.common.input } />
              </View>
              <View style={ styles.common.row }>
                <Text style={ styles.login.label }>
                  密码
                </Text>
                <TextInput placeholder="请输入密码"
                           secureTextEntry={ true }
                           onChangeText={ this.changePswd }
                           value={ this.state.password }
                           style={ styles.common.input } />
              </View>
              <TouchableOpacity style={ [styles.common.button, styles.login.button] }
                                onPress={ this.login }>
                <Text style={ styles.common.buttonText }>
                  登录
                </Text>
              </TouchableOpacity>
            </View>
            );
    },

    changeName(name) {
        this.setState({
            name: name
        });
    },

    changePswd(password) {
        this.setState({
            password: password
        });
    },

    async login() {
        var {name, password} = this.state;
        if (!name || !password) {
            return;
        }
        try {
            var response = await fetch(API.login, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: name,
                    password: password
                })
            })

            var status = response.status;
            var responseText = await response.text();
            switch (status) {
            case 500:
                Alert.alert(
                    '登录失败',
                    responseText || '服务器内部错误'
                )
                break;
            case 400:
                Alert.alert(
                    '登录失败',
                    responseText || '请求出现错误'
                )
                break;
            case 200:
                try {
                    await AsyncStorage.setItem(DICT.LOGINKEY, "true");
                } catch ( error ) {
                    console.error(error.message);
                }
                this.jumpForward();
                break;
            default: break;
            }
        } catch ( error ) {
            console.error(error);
        }
    },

    jumpForward() {
        var {index, navigator} = this.props;
        var nextIndex = index + 1;

        navigator.replace({
            title: '仓储管理系统',
            component: Welcome,
            index: 0
        })
    }
})

export default Login;
