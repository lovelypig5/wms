import React, { Navigator, TouchableOpacity, Text } from 'react-native';
import Home from '../home';
import LoginButton from '../login/loginButton';
import styles from '../../styles';

const Nav = React.createClass({

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

export default Nav;