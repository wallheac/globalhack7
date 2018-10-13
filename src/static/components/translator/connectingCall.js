import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dialog} from "@material-ui/core";
import {CircularProgress} from '@material-ui/core';

class ConnectingCall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false
        }
    }

    render() {
        return(
        <Dialog open={this.props.connecting}>
            <CircularProgress/>
        </Dialog>
        );
    }
}

ConnectingCall.propTypes = {
    connecting: PropTypes.bool
};

ConnectingCall.defaultProps = {
    connecting: false
};

export default ConnectingCall;