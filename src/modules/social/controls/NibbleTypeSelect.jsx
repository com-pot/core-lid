import React from "react";
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import infoNibbles from "../services/infoNibbles";


class NibbleTypeSelect extends React.Component {
    render() {
        const {name, value, types, onChange} = this.props;

        return (
            <Select value={value} name={name} onChange={(e) => onChange(e)}>
                {types.map((item) => (
                    <MenuItem key={item.type} value={item.type}>
                        <FontAwesomeIcon icon={item.icon}/>
                        <span>{item.caption}</span>
                    </MenuItem>
                ))}
            </Select>
        );
    }
}

export default class extends React.Component {
    render() {
        return (
            <NibbleTypeSelect {...this.props} types={infoNibbles.getTypes()}/>
        );
    }
};