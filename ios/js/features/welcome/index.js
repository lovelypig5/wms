import React, { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import Login from '../login';

var ios = React.createClass({
    getInitialState() {
        return {
            text: "",
            password: ""
        }
    },
    render() {
        return (
            <View style={ styles.layout.container }>
              <Text style={ styles.layout.title }>
                欢迎使用本系统
              </Text>
            </View>
            );
    },
    change(text) {
        this.setState({
            text: text
        });
    },
    login() {
        var {index, navigator} = this.props;
        var nextIndex = index + 1;

        navigator.push({
            name: 'Login',
            component: Login,
            index: nextIndex
        })
    }
})

export default ios;
