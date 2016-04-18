import React, { AsyncStorage, Navigator, Text, View, TextInput, TouchableOpacity } from 'react-native';
import LoginButton from '../login/loginButton';
import styles from '../../styles';

const HomeNav = React.createClass({

    render() {
        return (
            <Navigator initialRoute={ this.initialRoute() }
                       configureScene={ this.configureScene }
                       renderScene={ this.renderScene }
                       navigationBar={ <Navigator.NavigationBar routeMapper={ this.getRouteMapper() }
                                                                style={ [styles.common.container, styles.layout.navigator] } /> } />
        )
    },

    initialRoute() {
        return {
            title: '仓储管理系统',
            back: '',
            component: Home,
            index: 0,
            right: LoginButton
        }
    },

    configureScene(route) {
        if (route.sceneConfig) {
            return route.sceneConfig;
        }
        return Navigator.SceneConfigs.FloatFromRight;
    },

    renderScene(route, navigator) {
        let RouteView = route.component;
        if (route.configureScene) {
            navigator.configureScene = route.configureScene;
        }
        return <RouteView {...route.params}
                          {...this.props}
                          navigator={ navigator } />
    },

    getRouteMapper() {
        let props = this.props;
        var routeMapper = {
            LeftButton(route, navigator, index, navState) {
                if (index === 0) {
                    return null
                }
                const previousRoute = navState.routeStack[index - 1]
                return (
                    <TouchableOpacity onPress={ () => navigator.pop() }>
                      <Text style={ [styles.common.row, styles.layout.text] }>
                        { previousRoute.back || ' < ' }
                      </Text>
                    </TouchableOpacity>
                )
            },
            RightButton(route, navigator, index, navState) {
                var Right = route.right
                if (Right) {
                    return <Right {...props}
                                  navigator={ navigator } />
                }
            },
            Title(route, navigator, index, navState) {
                return (
                    <Text style={ [styles.common.row, styles.layout.title] }>
                      { route.title }
                    </Text>
                )
            }
        }

        return routeMapper;
    }

})


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
                        "出入库记录：组合属性级别的出入库记录"]
                }, {
                    title: "未来版本功能预测",
                    list: ["新商品：每个商品暂时只包含商品名称和商品属性",
                        "商品属性的自由创建和添加：从设计上来说，商品属性是属于商品的一部分特征，它可以被自由的增加到商品上，没有明确的类别设置",
                        "自由化的商品入库：自定义的组合属性入库商品，并且组合属性会单独记录库存",
                        "出库：类似入库的方式",
                        "出入库记录：组合属性级别的出入库记录"]
                }]
            }
        })
    },

    componentDidMount() {
        this.getUpdates();
    },

    render() {
        return (
            <View style={ [styles.common.container, styles.home.container] }>
              <Text style={ styles.home.h1 }>
                { this.state.updates.title }
              </Text>
              { (() => {
                    let ret = [];
                    let updates = this.state.updates
                    for (var i = 0; i < updates.content.length; i++) {
                        let content = updates.content[i];
                        ret.push(<Text style={ styles.home.title }
                                       key={ i }>
                                   { content.title }
                                 </Text>)
                
                        for (var j = 0; j < content.list.length; j++) {
                            let list = content.list[j];
                            ret.push(<Text style={ styles.home.content }
                                           key={ i + '-' + j }>
                                       { (j + 1) + '.  ' + list }
                                     </Text>)
                        }
                    }
                
                    return ret;
                })() }
              <Text style={ styles.home.title }>
              </Text>
            </View>
            );
    }

})

export default HomeNav;
