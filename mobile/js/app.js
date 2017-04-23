import React from 'react';
import { AppRegistry } from 'react-native';
import Router from './router';

class App extends React.Component {

    constructor() {
        super();
    }

    render() {
        return <Router />
    }

}

AppRegistry.registerComponent('wms', () => App);
