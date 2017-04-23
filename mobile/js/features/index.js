import React from 'react';
import Home from './home';
import Goods from './goods';

class Entry extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.user) {
            return <Goods {...this.props} />;
        }

        return <Home {...this.props} />;
    }

}

export default Entry;
