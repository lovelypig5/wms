import React, { AsyncStorage, Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../styles';

var Home = React.createClass({

    render() {
        return (
            <View style={ styles.common.container }>
              <Text style={ styles.login.title }>
                商品管理功能 新商品：每个商品暂时只包含商品名称和商品属性 商品属性的自由创建和添加：从设计上来说，商品属性是属于商品的一部分特征，它可以被自由的增加到商品上，没有明确的类别设置 自由化的商品入库：自定义的组合属性入库商品，并且组合属性会单独记录库存 出库：类似入库的方式 出入库记录：组合属性级别的出入库记录
              </Text>
              <Text>
                未来版本功能预测 商品数据统计：商品库存，今日数据 库存趋势：用于分析商品未来库存走势，已经库存告罄的大概时间节点 利润趋势：用于分析商品出售产生的总体利润
              </Text>
            </View>
            );
    }

})

export default Home;
