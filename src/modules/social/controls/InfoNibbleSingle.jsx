import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/es/Typography/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import infoNibbles from "../services/infoNibbles";

export default class InfoNibbleSingle extends React.Component {
    static propTypes = {
        nibble: PropTypes.object.isRequired,
    };

    render() {
        const {nibble} = this.props;

        const type = infoNibbles.getType(nibble.type);

        if (!type) {
            return <span>Invalid nibble type '{nibble.type}'</span>
        }

        if (type.type === "custom") {
            return (<div>
                <span>{nibble.label}:</span> <span>{nibble.value}</span>
            </div>);
        }

        if (type.hasIcon()) {
            return (<div>
                <FontAwesomeIcon icon={type.icon}/> <span>{nibble.value}</span>
            </div>);
        }

        return (<div>
            <span>{type.caption}</span>: <Typography>{nibble.value}</Typography>
        </div>);
    }
};

