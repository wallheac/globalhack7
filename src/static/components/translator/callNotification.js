import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import  DialogTitle from "@material-ui/core/DialogTitle";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {CheckCircle, Cancel} from '@material-ui/icons';

class CallNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acceptCall: null
        }
    }

    render() {
        return(
            <Dialog open={true}>
            <DialogTitle>Accept Call</DialogTitle>
                <List>
                    <ListItem>
                        <Button>
                            <CheckCircle/>
                        </Button>
                        <ListItemText>
                            Accept
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <Button>
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
    openCallNotification: PropTypes.bool,
    classes: PropTypes.object.isRequired
};

CallNotification.defaultProps = {
    openCallNotification: false
};

export default CallNotification;



