import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/es/Typography/Typography";

import OccupancyIcon from "@material-ui/icons/Business";

export default class InfoNib extends React.Component {
    static propTypes = {
        nib: PropTypes.object.isRequired,
    };

    render() {
        const {nib} = this.props;

        switch (nib.type) {
            case "occupancy":
                return (<div>
                    <OccupancyIcon/> <span>{nib.text}</span>
                </div>);

            case "custom":
                return (<div>
                    <span>{nib.label}:</span> <span>{nib.text}</span>
            </div>);

            default:
                return (<div>
                    <span>{nib.type}</span>: <Typography>{nib.text}</Typography>
                </div>);
        }



    }
};

