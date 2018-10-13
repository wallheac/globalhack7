import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import  DialogTitle from "@material-ui/core/DialogTitle";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {CheckCircle, Cancel} from '@material-ui/icons';

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



