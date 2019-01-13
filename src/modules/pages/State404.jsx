import React from 'react';

export default class State404 extends React.Component {
    render() {
        const {origin} = this.props;

        return (
            <div>
            <h1>404: Whoops</h1>
                <p>Path <b>{origin.path}</b> was not found</p>
            </div>
        );
    }
}