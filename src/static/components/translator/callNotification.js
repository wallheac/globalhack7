import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dialog, DialogTitle, IconButton, Typography, Grid} from "@material-ui/core";
import {CheckCircle, Cancel} from '@material-ui/icons';

class CallNotification extends Component {
    render() {
        return(
            <Dialog open={this.props.show}>
                <DialogTitle>Accept Call</DialogTitle>
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Typography>
                            Accept
                        </Typography>
                        <IconButton onClick={this.props.onAcceptCall}>
                            <CheckCircle/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography>
                            Decline
                        </Typography>
                        <IconButton onClick={this.props.onDeclineCall}>
                            <Cancel />
                        </IconButton>
                    </Grid>
                </Grid>
            </Dialog>
        );
    };
}

CallNotification.propTypes = {
    show: PropTypes.bool,
    onAcceptCall: PropTypes.func,
    onDeclineCall: PropTypes.func
};

CallNotification.defaultProps = {
    show: false
};

export default CallNotification;



