import React, { AsyncStorage, TabBarIOS, Text, ListView, View, TextInput, TouchableOpacity } from 'react-native';
import DICT from '../../config/dict';
import API from '../../config/api';
import styles from '../../styles';

const Goods = React.createClass({

    getInitialState() {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return {
            ds: ds,
            dataSource: ds.cloneWithRows([]),
            selectedTab: 'in-out',
            notifCount: 0,
            presses: 0,
        };
    },

    componentDidMount() {
        this.fetchData().done();
    },

    render() {
        var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

        return (
            <TabBarIOS style={ styles.common.container }
                       tintColor="white"
                       barTintColor="black">
              <TabBarIOS.Item title="商品列表"
                              icon={ { uri: base64Icon, scale: 3 } }
                              selected={ this.state.selectedTab === 'list' }
                              onPress={ this.changeTab.bind(this, 'list') }>
                <View style={ { flex: 1 } }>
                  <View style={ styles.common.navigator }>
                    <Text style={ styles.goods.title }>
                      商品列表
                    </Text>
                  </View>
                  <View style={ [styles.goods.tableRow, { backgroundColor: "#337ab0" }] }>
                    <Text style={ styles.goods.tableTitle }>
                      商品名称
                    </Text>
                    <Text style={ styles.goods.tableTitle }>
                      商品数量
                    </Text>
                  </View>
                  <ListView dataSource={ this.state.dataSource }
                            enableEmptySections={ true }
                            renderRow={ this.renderRow } />
                </View>
              </TabBarIOS.Item>
              <TabBarIOS.Item title="入库/出库"
                              icon={ { uri: base64Icon, scale: 3 } }
                              badge={ this.state.notifCount > 0 ? this.state.notifCount : undefined }
                              selected={ this.state.selectedTab === 'in-out' }
                              onPress={ this.changeTab.bind(this, 'in-out') }>
                <View style={ { flex: 1 } }>
                  <View style={ styles.common.navigator }>
                    <Text style={ styles.goods.title }>
                      入库/出库
                    </Text>
                  </View>
                  <View style={ styles.common.container_center }>
                    <View style={ styles.common.row }>
                      <Text style={ styles.goods.label }>
                        商品名称
                      </Text>
                      <TextInput placeholder="请输入商品名称"
                                 onChangeText={ this.changePswd }
                                 value={ this.state.password }
                                 style={ styles.common.input } />
                    </View>
                    <View style={ styles.common.row }>
                      <Text style={ styles.goods.label }>
                        商品数量
                      </Text>
                      <TextInput placeholder="请输入数量"
                                 onChangeText={ this.changePswd }
                                 value={ this.state.password }
                                 style={ styles.common.input } />
                    </View>
                    <View style={ styles.common.row }>
                      <Text style={ styles.goods.label }>
                        商品数量
                      </Text>
                      <TextInput placeholder="请输入数量"
                                 onChangeText={ this.changePswd }
                                 value={ this.state.password }
                                 style={ styles.common.input } />
                    </View>
                    <View style={ styles.common.row }>
                      <Text style={ styles.goods.label }>
                        商品数量
                      </Text>
                      <TextInput placeholder="请输入数量"
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
                    <TouchableOpacity style={ [styles.common.button, styles.login.button] }
                                      onPress={ this.login }>
                      <Text style={ styles.common.buttonText }>
                        登录
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TabBarIOS.Item>
              <TabBarIOS.Item title="出入库列表"
                              icon={ { uri: base64Icon, scale: 3 } }
                              selected={ this.state.selectedTab === 'in-out-list' }
                              onPress={ this.changeTab.bind(this, 'in-out-list') }>
                <View style={ { flex: 1 } }>
                  <View style={ styles.common.navigator }>
                    <Text style={ styles.goods.tableText }>
                      商品列表
                    </Text>
                  </View>
                  <ListView style={ { flex: 1 } }
                            contentContainerStyle={ { alignItems: "center" } }
                            dataSource={ this.state.dataSource }
                            enableEmptySections={ true }
                            renderRow={ this.renderRow } />
                </View>
              </TabBarIOS.Item>
              <TabBarIOS.Item title="创建商品"
                              icon={ { uri: base64Icon, scale: 3 } }
                              selected={ this.state.selectedTab === 'create' }
                              onPress={ this.changeTab.bind(this, 'create') }>
                <View style={ { flex: 1 } }>
                  <View style={ styles.common.navigator }>
                    <Text style={ styles.goods.tableText }>
                      商品列表
                    </Text>
                  </View>
                  <ListView style={ { flex: 1 } }
                            contentContainerStyle={ { alignItems: "center" } }
                            dataSource={ this.state.dataSource }
                            enableEmptySections={ true }
                            renderRow={ this.renderRow } />
                </View>
              </TabBarIOS.Item>
            </TabBarIOS>
        )
    },

    changeTab(tab) {
        this.setState({
            selectedTab: tab
        })
    },

    renderRow(rowData: string, sectionID: number, rowID: number) {
        return (<View style={ [styles.goods.tableRow, rowID % 2 == 0 ? { backgroundColor: '#CCC' } : { backgroundColor: '#888' }] }>
                  <Text style={ styles.goods.tableText }>
                    { rowData.name }
                  </Text>
                  <Text style={ styles.goods.tableText }>
                    { rowData.count }
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
                    dataSource: this.state.ds.cloneWithRows(json.content)
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