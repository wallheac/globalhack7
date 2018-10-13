import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dialog, DialogTitle, IconButton, Typography, Grid} from "@material-ui/core";
import {CheckCircle, Cancel} from '@material-ui/icons';

class CallNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acceptCall: null
        }
    }

    handleAccept() {
        //TODO
    }

    handleDecline() {
        //TODO
    }

    render() {
        return(
            <Dialog open={true}>
            <DialogTitle>Accept Call</DialogTitle>
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Typography>
                            Accept
                        </Typography>
                        <IconButton onClick={this.handleAccept}>
                            <CheckCircle/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography>
                            Decline
                        </Typography>
                        <IconButton onClick={this.handleDecline}>
                            <Cancel />
                        </IconButton>
                    </Grid>
                </Grid>
                </Dialog>
        );
    };
}

CallNotification.propTypes = {
    openCallNotification: PropTypes.bool,
};

CallNotification.defaultProps = {
    openCallNotification: false
};

export default CallNotification;



