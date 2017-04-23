import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import styles from '../../styles';

const homeStyles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 50
    },
    h1: {
        fontSize: 20,
        lineHeight: 32,
        height: 32,
        fontWeight: "500"
    },
    title: {
        fontSize: 16,
        lineHeight: 20,
        marginTop: 10,
        textAlign: 'left'
    },
    content: {
        fontSize: 14,
        lineHeight: 20,
        marginTop: 6,
        fontWeight: "300"
    }
});

const Home = React.createClass({

    getInitialState() {
        return {
            updates: {
                title: "",
                content: []
            }
        }
    },

    getUpdates() {
        this.setState({
            updates: {
                title: "版本1.0.0正式发布",
                content: [{
                    title: "商品管理功能",
                    list: ["新商品：每个商品暂时只包含商品名称和商品属性",
                        "商品属性的自由创建和添加：从设计上来说，商品属性是属于商品的一部分特征，它可以被自由的增加到商品上，没有明确的类别设置",
                        "自由化的商品入库：自定义的组合属性入库商品，并且组合属性会单独记录库存",
                        "出库：类似入库的方式",
                        "出入库记录：组合属性级别的出入库记录"
                    ]
                }, {
                    title: "未来版本功能预测",
                    list: ["新商品：每个商品暂时只包含商品名称和商品属性",
                        "商品属性的自由创建和添加：从设计上来说，商品属性是属于商品的一部分特征，它可以被自由的增加到商品上，没有明确的类别设置",
                        "自由化的商品入库：自定义的组合属性入库商品，并且组合属性会单独记录库存",
                        "出库：类似入库的方式",
                        "出入库记录：组合属性级别的出入库记录"
                    ]
                }]
            }
        })
    },

    componentDidMount() {
        this.getUpdates();
    },

    render() {
        let {updates} = this.state;
        return (
            <View style={ [styles.common.container, homeStyles.container] }>
              <Text style={ homeStyles.h1 }>
                { updates.title }
              </Text>
              { (() => {
                    let ret = [];
                    for (var i = 0; i < updates.content.length; i++) {
                        let content = updates.content[i];
                        ret.push(<Text style={ homeStyles.title }
                                       key={ i }>
                                   { content.title }
                                 </Text>)

                        for (var j = 0; j < content.list.length; j++) {
                            let list = content.list[j];
                            ret.push(<Text style={ homeStyles.content }
                                           key={ i + '-' + j }>
                                       { (j + 1) + '.  ' + list }
                                     </Text>)
                        }
                    }

                    return ret;
                })() }
            </View>
        );
    }

})

export default Home;
