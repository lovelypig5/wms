import React, { AsyncStorage, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Welcome from '../welcome';
import DICT from '../../config/dict';
import styles from '../../styles';

var Login = React.createClass({

    getInitialState() {
        return {
            text: "",
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
                <TextInput onChangeText={ this.changeText }
                           value={ this.state.text }
                           style={ styles.common.input } />
              </View>
              <View style={ styles.layout.row }>
                <Text style={ styles.layout.label }>
                  密码
                </Text>
                <TextInput onChangeText={ this.changePswd }
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

    changeText(text) {
        this.setState({
            text: text
        });
    },

    changePswd(password) {
        this.setState({
            password: password
        });
    },

    async login() {
        try {
            await AsyncStorage.setItem(DICT.LOGINKEY, "true");
            this.jumpForward();
        } catch ( error ) {
            console.error(error.message);
        }
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
