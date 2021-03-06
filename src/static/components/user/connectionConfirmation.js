import React, {Component} from "react";
import PropTypes from "prop-types";
import {Grid, Dialog, DialogTitle, CircularProgress, Typography, Button} from "@material-ui/core";
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
    state = {
        showNotes: false
    }
    showNotes = () => this.setState(prevState => ({showNotes: !prevState.showNotes}));
    render() {
        console.log("# this.state.showNotes: ", this.state.showNotes);
        return(
            <Dialog open>
                <Grid container alignItems="center" justify="center">
                    {
                        this.props.status && this.props.status.status === "CONNECTED" ?
                            <div>
                                <DialogTitle>You are now connected with your voice!</DialogTitle>
                                <Avatar
                                    alt="Jane Doe"
                                    src="./images/female1-512.png"
                                    className={`${this.props.classes.icon}, ${this.props.classes.bigIcon}`}
                                />
                            </div> :
                                this.props.status && this.props.status.status === "COMPLETE" ?
                                    <div style={{textAlign: "center", margin: 20}}>
                                        <Typography variant="title">Your voice has been heard</Typography>
                                        <Button fullWidth style={{margin: 6}} onClick={this.showNotes} size="large" variant="contained">Notes</Button>
                                        {
                                            this.state.showNotes && <Typography>{this.props.status.result}</Typography>
                                        }
                                    </div> :
                                        <Grid item container alignItems="center" justify="center">
                                            <CircularProgress />
                                        </Grid>
                    }
                </Grid>
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