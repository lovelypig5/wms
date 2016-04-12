import styles from '../../styles';
import React, { Text, View, TextInput, Button } from 'react-native';

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
                登录WMS
              </Text>
              <View style={ styles.layout.row }>
                <Text style={ styles.layout.label }>
                  用户名
                </Text>
                <TextInput onChangeText={ this.change } value={ this.state.text } style={ styles.common.input } />
              </View>
              <View style={ styles.layout.row }>
                <Text style={ styles.layout.label }>
                  密码
                </Text>
                <TextInput onChangeText={ this.change } value={ this.state.text } style={ styles.common.input } />
              </View>
              <View style={ styles.common.button }>
                <Text style={ styles.common.buttonText }>登录</Text>
              </View>
            </View>
            );
    },
    change(text) {
        this.setState({
            text: text
        });
    }
})

export default ios;
