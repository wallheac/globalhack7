import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dialog, DialogTitle, Grid} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    icon: {
        margin: 10,
    },
    bigIcon: {
        width: 60,
        height: 60,
    }
};

class ConnectionConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false
        }
    }

    render() {
        return(
            <Dialog open>
                <DialogTitle>You are now connected with</DialogTitle>
                <Grid container alignItems="center" justify="center">
                    <div>
                        <Avatar

                            alt="Jane Doe"
                            src="./images/female1-512.png"
                            className={`${this.props.classes.icon}, ${this.props.classes.bigIcon}`}
                        />
                    </div>
                </Grid>
                {/*@Todo connect translatorName props*/}
                <DialogTitle>Jane Doe</DialogTitle>
            </Dialog>
        );
    }
}

ConnectionConfirmation.propTypes = {
    connecting: PropTypes.bool,
    title: PropTypes.string,
    classes: PropTypes.object.isRequired
};

ConnectionConfirmation.defaultProps = {
    connecting: false,
    title: ""
};

export default withStyles(styles)(ConnectionConfirmation);