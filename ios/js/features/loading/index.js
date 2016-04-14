import React, { AsyncStorage, Text, View, TouchableOpacity } from 'react-native';
import Login from '../login';
import Welcome from '../welcome';
import DICT from '../../config/dict';
import styles from '../../styles';

var Loading = React.createClass({

    getInitialState() {
        return {
            name: "",
            password: ""
        }
    },

    componentDidMount() {
        this._initUser().done();
    },

    async _initUser() {
        var {index, navigator} = this.props;
        var nextIndex = index + 1;

        try {
            var value = await AsyncStorage.getItem(DICT.LOGINKEY);

            if (value !== null) {
                navigator.push({
                    title: '首页',
                    component: Welcome,
                    index: 0
                })
            } else {
                navigator.push({
                    title: '仓储管理系统',
                    component: Login,
                    index: 0,
                    right: <TouchableOpacity onPress={ this.login }
                                             style={ styles.layout.button }>
                             <Text style={ [styles.common.row, styles.layout.text] }>
                               登录
                             </Text>
                           </TouchableOpacity>
                })
            }
        } catch ( error ) {
            console.error(error.message);
        }
    },

    render() {
        return (
            <View style={ styles.layout.container }>
              <Text style={ styles.layout.title }>
                加载中
              </Text>
            </View>
            );
    }

})

export default Loading;