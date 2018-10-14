import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Lock, Save, CallEnd, Edit, Call} from '@material-ui/icons';
import {Grid, IconButton} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

class CallOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleCallEnd() {
        //TODO
    }

    handleSendProtected() {
        //TODO
    }

    handleSaveCall() {
        //TODO
    }

    render() {
    return(
        <Fragment>
            {this.props.makeCall &&
                <Grid container direction="column" alignItems="flex-end">
                <IconButton onClick={this.handleMakeCall}>
                    <Call/>
                </IconButton>
            </Grid>
            }
            {(this.props.inCall || this.props.saveCall) &&
            <Grid container>
                <Grid item>
                    <IconButton onClick={this.handleCallEnd}>
                        <CallEnd/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton onClick={this.handleSendProtected}>
                        <Lock/>
                    </IconButton>
                </Grid>
                {this.props.inCall &&
                <Grid item>
                    <IconButton onClick={this.handleSaveCall}>
                        <Edit/>
                    </IconButton>
                </Grid>
                }
                {this.props.saveCall &&
                <Grid item>
                    <IconButton onClick={this.handleSaveCall}>
                        <Save/>
                    </IconButton>
                </Grid>
                }
            </Grid>
            }
        </Fragment>
    );
    }
}

CallOptions.propTypes = {
    makeCall: PropTypes.bool,
    inCall: PropTypes.bool,
    saveCall: PropTypes.bool
};

CallOptions.defaultProps = {
    makeCall: false,
    inCall: false,
    saveCall: false
};

export default CallOptions;

