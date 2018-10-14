import React, {Component} from "react";
import PropTypes from "prop-types";
import {Grid, Dialog, DialogTitle, CircularProgress} from "@material-ui/core";
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
    render() {
        console.log("# this.props.status: ", this.props.status);
        return(
            <Dialog open>
                <Grid container alignItems="center" justify="center">
                    {
                        this.props.status === "CONNECTED" ?
                            <div>
                                <DialogTitle>You are now connected with your voice!</DialogTitle>
                                <Avatar
                                    alt="Jane Doe"
                                    src="./images/female1-512.png"
                                    className={`${this.props.classes.icon}, ${this.props.classes.bigIcon}`}
                                />
                            </div> :
                            <Grid container alignItems="center" justify="center">
                                <CircularProgress/>
                            </Grid>
                    }
                </Grid>
                {/*@Todo connect translatorName props*/}
            </Dialog>
        );
    }
}

ConnectionConfirmation.propTypes = {
    status: PropTypes.bool,
    classes: PropTypes.object.isRequired
};

ConnectionConfirmation.defaultProps = {
    status: false,
};

export default withStyles(styles)(ConnectionConfirmation);