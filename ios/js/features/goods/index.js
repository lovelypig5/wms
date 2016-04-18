import React, { AsyncStorage, Text, ListView, View, TextInput, TouchableOpacity } from 'react-native';
import DICT from '../../config/dict';
import API from '../../config/api';
import styles from '../../styles';

const Goods = React.createClass({

    getInitialState() {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return {
            dataSource: ds.cloneWithRows([]),
        };
    },

    componentDidMount() {
        this.fetchData().done();
    },

    render() {
        return (
            <View style={ [styles.common.container] }>
              <Text>
                123
              </Text>
              <ListView dataSource={ this.state.dataSource }
                        enableEmptySections={ true }
                        renderRow={ this.renderRow } />
            </View>
        )
    },

    renderRow(data) {
        return (<View>
                  <Text>
                    { data.name }
                  </Text>
                  <Text>
                    { data.count }
                  </Text>
                </View>)
    },

    async fetchData() {
        try {
            var response = await fetch(API.goodList, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
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
                var json = JSON.parse(responseText);
                this.setState({
                    dataSource: new ListView.DataSource({
                        rowHasChanged: (r1, r2) => r1 !== r2
                    }).cloneWithRows(json.content)
                })
                break;
            default:
                break;
            }
        } catch ( error ) {
            console.error(error);
        }
    }

})

export default Goods;