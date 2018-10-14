import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {IconButton, Grid, Button} from "@material-ui/core";
import {Call} from '@material-ui/icons';
import SoundBoard from './soundBoard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
                    <List>
                    <ListItem>
                      <ListItemText primary={this.props.name} secondary="Name" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={this.props.phoneNumber} secondary="Phone Number" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={this.props.textToTranslate} secondary="Details" />
                    </ListItem>
                  </List>
                </Grid>
                <Button onClick={this.props.endCall}>End Call</Button>
                <Grid container direction="column" alignItems="flex-end">
                    <SoundBoard userInformation={this.props.userInformation} />
                </Grid>
            </Fragment>
        );
    }
}

TranslationDisplay.propTypes = {
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    textToTranslate: PropTypes.string,
    userInformation: PropTypes.array,
    endCall: PropTypes.func.isRequired
};

TranslationDisplay.defaultProps = {
    name: "",
    phoneNumber: "",
    textToTranslate: "",
    userInformation: {}
};

export default TranslationDisplay;
