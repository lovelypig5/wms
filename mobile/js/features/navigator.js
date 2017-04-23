import React from 'react';
import { Navigator, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

class Nav extends React.Component {

    constructor(props) {
        super(props);

        this.renderScene = this.renderScene.bind(this);
    }

    render() {
        return (<Navigator initialRoute={ this.props.initialRoute }
                       configureScene={ this.configureScene }
                       renderScene={ this.renderScene }
                       navigationBar={ <Navigator.NavigationBar routeMapper={ this.getRouteMapper() }
                                                                style={ styles.common.navigator } />
        }
        />)
    }

    configureScene(route) {
        if (route.sceneConfig) {
            return route.sceneConfig;
        }
        return Navigator.SceneConfigs.FloatFromRight;
    }

    renderScene(route, navigator) {
        let RouteView = route.component;
        if (route.configureScene) {
            navigator.configureScene = route.configureScene;
        }
        return <RouteView {...this.props} {...this.state} navigator={ navigator } />
    }

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
                    console.log(props)
                    return <Right {...props} navigator={ navigator } />
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

}

export default Nav;
