import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dialog, DialogTitle, IconButton, Grid} from "@material-ui/core";
import {Hearing, Cancel} from '@material-ui/icons';

class CallComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleEndAvailability () {
        //TODO
    }

    handleContinueAvailability() {
        //TODO
    }

    render() {
        return(
            <Dialog open={this.props.callComplete}>
                <DialogTitle>
                    {this.props.title}
                </DialogTitle>
                <Grid container justify="center">
                    <Grid item>
                        <IconButton onClick={this.handleEndAvailability}>
                            <Cancel/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={this.handleContinueAvailability}>
                            <Hearing/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Dialog>
        );
    }
}

CallComplete.propTypes = {
    title: PropTypes.string,
    callComplete: PropTypes.bool,
    onAvailabilityChoice: PropTypes.func
}

CallComplete.defaultProps = {
    title: ""
}

export default CallComplete;

