import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

class SelectYourLanguage extends PureComponent {
    handleSelectYourLanguage = event => this.props.onSelectYourLanguage(event.target.value);

    render() {
        return (
            <TextField
                select
                fullWidth
                label="Please Select Your Language"
                value={this.props.language || ""}
                onChange={this.handleSelectYourLanguage}>
                // TODO: map over languages object...
                <MenuItem key="english" value="english">English</MenuItem>
                <MenuItem key="notenglish" value="notenglish">Not English</MenuItem>
                <MenuItem key="chinese" value="chinese">Chinese</MenuItem>
                <MenuItem key="japanese" value="japanese">Japanese</MenuItem>
            </TextField>
        );
    }
}

SelectYourLanguage.propTypes = {
    language: PropTypes.string,
    onSelectYourLanguage: PropTypes.func
};

SelectYourLanguage.defaultProps = {
    language: null,
    onSelectYourLanguage: null
};

export default SelectYourLanguage;
