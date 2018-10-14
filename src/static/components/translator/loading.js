import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dialog, DialogTitle, DialogCqntent} from "@material-ui/core";
import {CircularProgress} from '@material-ui/core';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false
        }
    }

    render() {
        return(
        <Dialog open={this.props.connecting}>
            <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent scroll="paper">
                    <CircularProgress/>
                </DialogContent>
        </Dialog>
        );
    }
}

Loading.propTypes = {
    connecting: PropTypes.bool,
    title: PropTypes.string
};

Loading.defaultProps = {
    connecting: false,
    title: ""
};

export default Loading;