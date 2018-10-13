import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {CheckCircle, Cancel} from '@material-ui/icons';
import {List, ListItem, ListItemText, Button, Dialog, DialogTitle, IconButton, Typography, Grid} from "@material-ui/core";

class CallNotification extends PureComponent {
    render() {
        return(
            <Dialog open={this.props.show}>
                <DialogTitle>Accept Call</DialogTitle>
                <List>
                    <ListItem>
                        <Button onClick={this.props.onAcceptCall}>
                            <CheckCircle/>
                        </Button>
                        <ListItemText>
                            Accept
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <Button onClick={this.props.onDeclineCall}>
                            <Cancel />
                        </Button>
                        <ListItemText>
                            Decline
                        </ListItemText>
                    </ListItem>
                </List>
            </Dialog>
        );
    };
}

CallNotification.propTypes = {
    show: PropTypes.bool,
    onAcceptCall: PropTypes.func.isRequired,
    onDeclineCall: PropTypes.func.isRequired
};

CallNotification.defaultProps = {
    show: false
};

export default CallNotification;
