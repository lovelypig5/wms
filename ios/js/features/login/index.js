import React, { AsyncStorage, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Welcome from '../welcome';
import DICT from '../../config/dict';
import API from '../../config/api';
import styles from '../../styles';

var Login = React.createClass({

    getInitialState() {
        // AsyncStorage.removeItem(DICT.LOGINKEY);
        return {
            name: "",
            password: ""
        }
    },

    componentDidMount() {
        this._initUser().done();
    },

    async _initUser() {
        try {
            var value = await AsyncStorage.getItem(DICT.LOGINKEY);
            if (value !== null) {
                this.jumpForward();
            }
        } catch ( error ) {
            console.error(err.message);
        }
    },

    render() {
        return (
            <View style={ styles.layout.container }>
              <Text style={ styles.layout.title }>
                仓储管理系统
              </Text>
              <View style={ styles.layout.row }>
                <Text style={ styles.layout.label }>
                  用户名
                </Text>
                <TextInput placeholder="请输入用户名"
                           onChangeText={ this.changeName }
                           value={ this.state.name }
                           style={ styles.common.input } />
              </View>
              <View style={ styles.layout.row }>
                <Text style={ styles.layout.label }>
                  密码
                </Text>
                <TextInput placeholder="请输入密码"
                           secureTextEntry={ true }
                           onChangeText={ this.changePswd }
                           value={ this.state.password }
                           style={ styles.common.input } />
              </View>
              <TouchableOpacity style={ [styles.common.button, styles.layout.button] }
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

    login() {
        var {name, password} = this.state;
        if (!name || !password) {
            return;
        }

        try {
            fetch(API.login, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: name,
                    password: password
                })
            }).then((response) => {
                console.warn(response.text())
                return response.text();
            }).then((responseText) => {
                console.warn(responseText);
            }).catch((error) => {
                // Handle error
                console.error(error);
            });
        } catch ( error ) {
            // Handle error
            console.error(error);
        }






        // switch (response.status) {
        // case 500:
        //     console.warn(response.text().responseText || '服务器错误');
        //     break;
        // case 400:
        //     console.warn(response.text().responseText || '请求出现错误');
        //     break;
        // default: break;
        // }


        // try {
        //     await AsyncStorage.setItem(DICT.LOGINKEY, "true");
        //     this.jumpForward();
        // } catch ( error ) {
        //     console.error(error.message);
        // }
    },

    jumpForward() {
        var {index, navigator} = this.props;
        var nextIndex = index + 1;

        navigator.push({
            title: 'Welcome',
            component: Welcome,
            index: 1
        })
    }
})

export default Login;
