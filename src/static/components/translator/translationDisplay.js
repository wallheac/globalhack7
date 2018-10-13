import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {IconButton, Grid} from "@material-ui/core";
import {Call} from '@material-ui/icons';
import Loading from './loading';

class TranslationDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connecting: false
        }
    }

    handleMakeCall = () => {
        //TODO
        this.setState({connecting: true});
    }

    handleCallConnected = () => {
        this.setState({connecting:false})
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
                <Loading
                    title={"Connecting"}
                    connecting={this.state.connecting}
                />
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