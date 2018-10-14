import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {IconButton, Grid, Button, TextField} from "@material-ui/core";
import {Call, CallEnd} from '@material-ui/icons';
import SoundBoard from './soundBoard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class TranslationDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: null
        }
    }

    onNoteChange = event => this.setState({notes: event.target.value});

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
                <Grid item>
                    <TextField
                        fullWidth
                        value={this.state.notes || ""}
                        label="Notes from call"
                        onChange={this.onNoteChange}
                        multiline
                        rows="4"
                        style={{marginBottom: "20px"}}
                    />
                </Grid>
                <Grid container direction="column" alignItems="flex-end">
                    <SoundBoard userInformation={this.props.userInformation} />
                </Grid>
                <Grid item container justify="center">
                    <IconButton onClick={this.props.endCall(this.state.notes)} size="large">
                        <CallEnd color="secondary" style={{cursor: "pointer", fontSize: "100px"}} />
                    </IconButton>
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
