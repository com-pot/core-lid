import React from 'react';
import PropTypes from 'prop-types';

export default class DateControl extends React.Component {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.instanceOf(Date)
        ]).isRequired,
        format: PropTypes.string,
    };

    render() {
        const {value, format} = this.props;

        const date = typeof value === "number" ? new Date(value) : value;
        if(!format) {

        }

        return date.toLocaleString();

    }

}