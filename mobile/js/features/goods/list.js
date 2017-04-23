import React from 'react';
import { Text, ListView, View, Alert, StyleSheet } from 'react-native';
import API from '../../config/api';
import styles from '../../styles';

var goodsStyle = StyleSheet.create({
    title: {
        color: 'white',
        marginTop: 30,
        textAlign: "center"
    },
    tableRow: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: "center"
    },
    tableTitle: {
        flex: 1,
        textAlign: "center"
    },
    tableText: {
        flex: 1,
        textAlign: "center"
    },
    label: {
        fontSize: 16,
        width: 80,
        margin: 10
    },
    input: {
        flex: 1
    }
});

class GoodList extends React.Component {

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            ds: ds,
            dataSource: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <View style={ { flex: 1 } }>
              <View style={ styles.common.navigator }>
                <Text style={ goodsStyle.title }>
                  商品列表
                </Text>
              </View>
              <View style={ [goodsStyle.tableRow, { backgroundColor: "#337ab0" }] }>
                <Text style={ goodsStyle.tableTitle }>
                  商品名称
                </Text>
                <Text style={ goodsStyle.tableTitle }>
                  商品数量
                </Text>
              </View>
              <ListView dataSource={ this.state.dataSource }
                        enableEmptySections={ true }
                        renderRow={ this.renderRow } />
            </View>)
    }

    async fetchData() {
        try {
            var response = await fetch(API.goodList, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'access-token': this.props.user.token
                }
            })

            var status = response.status;
            var responseText = await response.text();
            switch (status) {
                case 200:
                    var json = JSON.parse(responseText);
                    this.setState({
                        dataSource: this.state.ds.cloneWithRows(json.content)
                    })
                    break;
                case 401:
                    this.props.navigator.pop();
                    break;
                default:
                    Alert.alert('登录失败', responseText || '服务器内部错误');
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    }

    renderRow(rowData: string, sectionID: number, rowID: number) {
        return (
            <View style={ [goodsStyle.tableRow, rowID % 2 == 0 ? { backgroundColor: '#CCC' } : { backgroundColor: '#888' }] }>
              <Text style={ goodsStyle.tableText }>
                { rowData.name }
              </Text>
              <Text style={ goodsStyle.tableText }>
                { rowData.count }
              </Text>
            </View>)
    }

}

export default GoodList;
