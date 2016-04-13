import React, { AsyncStorage, Navigator, TouchableOpacity, Text, } from 'react-native';
import Welcome from '../features/welcome';
import Login from '../features/login';
// import NavigationBar from '../features/navigationBar';
import styles from '../styles';

var Router = React.createClass({

    getInitialState() {
        return {};
    },

    render() {
        return (
            <Navigator initialRoute={ this.initialRoute() }
                       configureScene={ this.configureScene }
                       renderScene={ this.renderScene }
                       navigationBar={ <Navigator.NavigationBar routeMapper={ this.getRouteMapper() } /> } />
            );
    },

    initialRoute() {
        return {
            title: '',
            component: Login,
            index: 0
        }
    },

    configureScene(route) {
        return Navigator.SceneConfigs.FloatFromRight;
    },

    renderScene(route, navigator) {
        let RouteView = route.component;
        return <RouteView {...route.params}
                          navigator={ navigator } />
    },

    getRouteMapper() {
        var routeMapper = {
            LeftButton(route, navigator, index, navState) {
                if (index === 0) {
                    return null
                }
                const previousRoute = navState.routeStack[index - 1]
                return (
                    <TouchableOpacity onPress={ () => navigator.pop() }>
                      <Text style={ styles.navText }>
                        { previousRoute.title }
                      </Text>
                    </TouchableOpacity>
                )
            },
            RightButton(route, navigator, index, navState) {
                if (route.rightElement) {
                    return route.rightElement
                }
            },
            Title(route, navigator, index, navState) {
                return (
                    <Text style={ styles.navText }>
                      { route.title }
                    </Text>
                )
            }
        }

        return routeMapper;
    }
})

export default Router;