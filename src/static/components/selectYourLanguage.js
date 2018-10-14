import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Mic from "@material-ui/icons/Mic";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid"
import Languages from "../test/languages";

class SelectYourLanguage extends PureComponent {
    handleSelectYourLanguage = event => this.props.onSelectYourLanguage(event.target.value);

    render() {
        return (
            <Grid container direction="column" style={{backgroundColor:"#f8d959", height: "100%"}}>
                <Grid item container alignContent="center" justify="center">
                    <Mic style={{fontSize: "200px", color: "white", marginTop: 40}} />
                </Grid>
                <Grid item>
                    <TextField
                        select
                        fullWidth
                        label="Please Select Your Language"
                        value={this.props.language || ""}
                        onChange={this.handleSelectYourLanguage}>
                        {Languages.map(language =>
                            <MenuItem key={language.language} value={language.language}>
                                {language.name}
                            </MenuItem>
                        )}
                    </TextField>
                </Grid>
            </Grid>
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
