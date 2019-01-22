import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InfoNibControl from "./InfoNibbleSingle";
import SettingsIcon from "@material-ui/icons/Settings";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import TextInput from "@material-ui/core/TextField";
import NibbleTypeSelect from "./NibbleTypeSelect";

import infoNibbles from "../services/infoNibbles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class NibblesModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            /** @type {InfoNibble[]} */
            nibbles: this.props.nibbles,

            editIndex: -1,
            canAddNib: true,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const editIndex = (!this.state.open && nextProps.open) ? -1 : this.state.editIndex;
        this.setState({
            editIndex,
            open: nextProps.open,
        })
    }

    handleClose(save) {
        this.props.onClose(save ? this.state.nibbles : undefined);
    }

    selectNibble(i) {
        const canAddNib = this.state.nibbles.every((/**InfoNibble*/ nibble) => {
            return !!(nibble.type && nibble.value);
        });

        this.setState({
            editIndex: i,
            canAddNib
        });
    }

    saveNibble(i, nibble) {
        const nibbles = [...this.state.nibbles];
        nibbles.splice(i, 1, nibble);

        this.setState({
            editIndex: -1,
            nibbles
        });
    }

    addNibble() {
        this.setState({
            nibbles: [...this.state.nibbles, infoNibbles.create()],
            editIndex: this.state.nibbles.length,
            canAddNib: false,
        });
    }


    render() {
        return (
            <Dialog open={this.state.open} onClose={() => this.handleClose()} disableEnforceFocus={true}>
                <DialogTitle>Super Secret Password</DialogTitle>
                <DialogContent>
                    <List>
                        {this.state.nibbles.map((nibble, i) => (
                            <ListItem key={i}>
                                {i !== this.state.editIndex ? (<div>
                                    <InfoNibControl nibble={nibble}/>
                                    <Button onClick={() => this.selectNibble(i)}>
                                        <SettingsIcon/>
                                    </Button>
                                </div>) : (<div>
                                    <EditNibComponent nibble={nibble} types={this.props.types}
                                                      onCommit={(nibble) => this.saveNibble(i, nibble)}/>
                                    <Button onClick={() => this.selectNibble(-1)}>
                                        <CancelIcon/>
                                    </Button>
                                </div>)
                                }
                            </ListItem>
                        ))}
                        {this.state.canAddNib && <ListItem>
                            <Button onClick={() => this.addNibble()}>
                                <AddIcon/>
                            </Button>
                        </ListItem>}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => this.handleClose(true)}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

/**
 * @property {InfoNibble} props.nib
 * @property {ReadonlyArray<InfoNibbleType>} props.nibTypes
 */
class EditNibComponent extends React.Component {
    constructor(props) {
        super(props);

        const {nibble} = this.props;

        this.state = {
            type: nibble.type,
            value: nibble.value,
            extra: Object.assign({}, nibble.extra),
        };
    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const {type, value} = this.state;
        const {onCommit} = this.props;

        return (<div>
            <NibbleTypeSelect value={type} name="type" onChange={(e) => this.handleChange(e)}/>
            <TextInput name="value" value={value} onChange={(e) => this.handleChange(e)}/>

            <Button onClick={() => onCommit(this.state)}>
                <FontAwesomeIcon icon="check"/>
            </Button>
        </div>)
    }
}

export default class extends React.Component {
    render() {
        return (
            <NibblesModal {...this.props} types={infoNibbles.getTypes()}/>
        );
    }
};