import React from 'react';

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class SearchField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.hasOwnProperty('query') && nextProps.query !== this.state.query) {
            this.setState({query: nextProps.query});
        }
    }

    onChange(query) {
        this.setState({query});

        this.props.onChange && this.props.onChange(query);
    }

    handleSearch() {
        this.props.onSearch && this.props.onSearch(this.state.query);
    }

    render() {
        const {id} = this.props;

        return (
            <FormControl>
                <InputLabel htmlFor={id}>Search</InputLabel>
                <Input
                    id={id}
                    value={this.state.query}
                    onChange={(e) => this.onChange(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Search"
                                onClick={() => this.handleSearch()}
                            >
                                <FontAwesomeIcon icon="search"/>
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        );
    }
};