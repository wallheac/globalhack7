import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {IconButton, Grid} from "@material-ui/core";
import {Call} from '@material-ui/icons';

class TranslationDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleMakeCall() {
        //TODO
    }

    render() {
        return(
            <Fragment>
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        {this.props.name}
                    </Grid>
                    <Grid item>
                        {this.props.phoneNumber}
                    </Grid>
                    <Grid item>
                        {this.props.textToTranslate}
                    </Grid>
                </Grid>
                <Grid container direction="column" alignItems="flex-end">
                    <IconButton onClick={this.handleMakeCall}>
                        <Call/>
                    </IconButton>
                </Grid>
            </Fragment>
        );
    }
}

TranslationDisplay.propTypes = {
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    textToTranslate: PropTypes.string
};

TranslationDisplay.defaultProps = {
    name: "",
    phoneNumber: "",
    textToTranslate: ""
};

export default TranslationDisplay;