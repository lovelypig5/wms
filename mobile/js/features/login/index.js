import React from 'react';
import { AsyncStorage, Alert, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Home from '../home';
import Goods from '../goods';
import DICT from '../../config/dict';
import API from '../../config/api';
import styles from '../../styles';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            password: ""
        }

        this.changeName = this.changeName.bind(this);
        this.changePswd = this.changePswd.bind(this);
        this.login = this.login.bind(this);
    }

    render() {
        return (
            <View style={ styles.common.container_center }>
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
        )
    }

    changeName(name) {
        this.setState({
            name: name
        });
    }

    changePswd(password) {
        this.setState({
            password: password
        });
    }

    async login() {
        var { name, password } = this.state;
        if (!name || !password) {
            Alert.alert('登录失败', '用户名或密码不能为空！');
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
                case 200:
                    try {
                        await AsyncStorage.setItem(DICT.LOGINKEY, responseText);
                        await this.props.initUser(responseText);
                    } catch (error) {
                        Alert.alert('内部错误', '内部错误，即将退出!');
                        return;
                    }
                    this.jumpForward();
                    break;
                default:
                    Alert.alert('登录失败', responseText || '服务器内部错误');
                    break;
            }
        } catch (error) {
            Alert.alert('登录失败', '无法连接到服务器');
        }
    }

    jumpForward() {
        var { navigator } = this.props;
        navigator.pop();
    }

}

export default Login;
