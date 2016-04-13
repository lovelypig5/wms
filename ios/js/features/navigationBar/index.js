import React, { Component, Navigator, TouchableOpacity, Text } from 'react-native';
import styles from '../../styles';

class NavigationBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navigator.NavigationBar routeMapper={ this.getRouteMapper() } />
            );
    }

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
}

export default NavigationBar;