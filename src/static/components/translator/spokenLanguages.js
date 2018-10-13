import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

class SpokenLanguages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguages: null
        }
    }

    onSelectLanguage = event => this.setState(prevState => {
        const selectedLanguages = prevState.selectedLanguages || [];
        selectedLanguages.push(event.target.value);
        return {selectedLanguages};
    });

    onDeleteChip = event => this.setState(prevState => {
        const selectedLanguages = prevState.selectedLanguages;
        const indexToRemove = selectedLanguages.indexOf(event.target.value);
        return {selectedLanguages: selectedLanguages.splice(indexToRemove, 1)};
    })

    render() {
        return (
            <Fragment>
                <TextField
                    select
                    fullWidth
                    label="Please Select Your Language"
                    value={this.props.language || "english"}
                    onChange={this.onSelectLanguage}>
                    // TODO: map over languages object...
                    <MenuItem key="english" value="english">English</MenuItem>
                    <MenuItem key="notenglish" value="notenglish">Not English</MenuItem>
                    <MenuItem key="chinese" value="chinese">Chinese</MenuItem>
                    <MenuItem key="japanese" value="japanese">Japanese</MenuItem>
                </TextField>
                {
                    this.state.selectedLanguages && this.state.selectedLanguages.map(item => <Chip label={item} onClose={this.onDeleteChip}/>)
                }
            </Fragment>

        );
    }
};

SpokenLanguages.propTypes = {

};

SpokenLanguages.defaultProps = {

};

export default SpokenLanguages;
