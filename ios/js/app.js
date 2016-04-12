import React, { AppRegistry, Component, Navigator } from 'react-native';
import Welcome from './features/welcome';

class App extends React.Component {
    render() {
        return (
            <Navigator
                       initialRoute={ {    name: 'Welcome',    component: Welcome} }
                       configureScene={ (route) => {
                                            return Navigator.SceneConfigs.FloatFromRight;
                                        } }
                       renderScene={ (route, navigator) => {
                                         let Component = route.component;
                                         return <Component
                                                           {...route.params}
                                                           navigator={ navigator } />
                                     } } />
            );
    }
}

AppRegistry.registerComponent('ios', () => App);