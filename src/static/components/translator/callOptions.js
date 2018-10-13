import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Lock, Save, CallEnd} from '@material-ui/icons';
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
                <Grid item>
                    <IconButton onClick={this.handleSaveCall}>
                        <Save/>
                    </IconButton>
                </Grid>
            </Grid>
        </Fragment>
    );
    }
}

CallOptions.propTypes = {};

CallOptions.defaultProps = {};

export default CallOptions;

