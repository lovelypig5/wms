import React, { Navigator, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import SideMenu from 'react-native-side-menu';
// import menu from '../features/menu';
import Loading from '../features/loading';
// import NavigationBar from '../features/navigationBar';
import styles from '../styles';

var Router = React.createClass({

    getInitialState() {
        return {};
    },

    render() {
        var menu = <ScrollView scrollsToTop={ false }
                               style={ styles.menu.menu }>
                     <View style={ styles.menu.avatarContainer }>
                       <Text style={ styles.menu.name }>
                         Your name
                       </Text>
                     </View>
                     <Text onPress={ () => this.props.onItemSelected('About') }
                           style={ styles.menu.item }>
                       About
                     </Text>
                     <Text onPress={ () => this.props.onItemSelected('Contacts') }
                           style={ styles.menu.item }>
                       Contacts
                     </Text>
                   </ScrollView>

        return (
            // <SideMenu menu={ menu }>
            <Navigator initialRoute={ this.initialRoute() }
                       configureScene={ this.configureScene }
                       renderScene={ this.renderScene }
                       onForward={ () => {
                                       console.warn('forward');
                                   } }
                       onBack={ () => {
                                    console.warn('back');
                                } }
                       navigationBar={ <Navigator.NavigationBar routeMapper={ this.getRouteMapper() }
                                                                style={ [styles.common.container, styles.layout.navigator] } /> } />
            // </SideMenu>
            );
    },

    initialRoute() {
        return {
            title: '',
            component: Loading,
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
                      <Text style={ [styles.common.row, styles.layout.text] }>
                        { previousRoute.title }
                      </Text>
                    </TouchableOpacity>
                )
            },
            RightButton(route, navigator, index, navState) {
                if (route.right) {
                    return route.right
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

export default Router;