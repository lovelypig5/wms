import React, { AppRegistry } from 'react-native';
import Router from './router';

class App extends React.Component {
    render() {
        return (
            <Router />
            );
    }
}

AppRegistry.registerComponent('ios', () => App);