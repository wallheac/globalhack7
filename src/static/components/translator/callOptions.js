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

    render() {
    return(
        <Fragment>
            <Grid container>
                <Grid item>
                    <IconButton>
                        <CallEnd/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton>
                        <Lock/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton>
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

