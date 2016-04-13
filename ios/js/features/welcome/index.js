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
    }

})

export default ios;
