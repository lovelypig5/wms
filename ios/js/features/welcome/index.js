import React, { AsyncStorage, Text, View, TextInput, TouchableOpacity } from 'react-native';

import styles from '../../styles';

var Welcome = React.createClass({

    render() {
        return (
            <View style={ styles.common.container }>
              <Text style={ styles.login.title }>
                欢迎使用本系统
              </Text>
            </View>
            );
    }

})

export default Welcome;
