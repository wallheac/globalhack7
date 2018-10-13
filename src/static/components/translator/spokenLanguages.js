import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class SpokenLanguages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            selectedLanguages: []
        }
    }

    onSelectLanguage = event => this.setState(prevState => {
        const selectedLanguages = prevState.selectedLanguages;
        selectedLanguages.push(event.target.value);
        return {selectedLanguages};
    });

    onDeleteChip = item => () => this.setState(prevState => {
        const selectedLanguages = prevState.selectedLanguages;
        const indexToDelete = this.state.selectedLanguages.indexOf(item);
        if(selectedLanguages && selectedLanguages.length > 1) {
            const beginning = selectedLanguages.slice(0, indexToDelete);
            const end = selectedLanguages.slice(indexToDelete + 1);
            return {selectedLanguages: beginning.concat(end)}
        }
        return {selectedLanguages: []}
    });

    onChangeName = event => this.setState({name: event.target.value});

    handleGoOnline = () => {
        // TODO: validate form...
        this.props.onGoOnline();
    }

    render() {
        const languages = this.props.languageOptions.filter(language => !this.state.selectedLanguages.includes(language.value));
        const hasLanguages = languages && Array.isArray(languages) && languages.length > 0;
        return (
            <Grid item container direction="column" spacing={24}>
                <Grid item>
                    <TextField
                        fullWidth
                        label="Name"
                        onChange={this.onChangeName}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        select
                        fullWidth
                        disabled={languages.length === 0}
                        label="Please Select Your Language"
                        placeholder="Please Select Your Language"
                        value={hasLanguages && languages[0].value}
                        onChange={this.onSelectLanguage}>
                        {
                            hasLanguages && languages.map(language => (
                                <MenuItem
                                    key={language.value}
                                    value={language.value}>
                                    {language.label}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                    {
                        this.state.selectedLanguages
                            .map(languageValue => {
                                const language = this.props.languageOptions.find(lang => languageValue === lang.value);
                                return <Chip
                                    key={language.value}
                                    label={language.label}
                                    value={language.value}
                                    onDelete={this.onDeleteChip(language.value)}
                                />
                            })
                    }
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={this.handleGoOnline}>Go Online!</Button>
                </Grid>
            </Grid>

        );
    }
};

SpokenLanguages.propTypes = {
    languageOptions: PropTypes.array,
    onGoOnline: PropTypes.func.isRequired
};

SpokenLanguages.defaultProps = {
    languageOptions: [
        {label: "English", value: "english"},
        {label: "Eskimo", value: "eskimo"},
        {label: "Potato Language", value: "potato_language"},
        {label: "Swiss", value: "swiss"}
    ]
};

export default SpokenLanguages;
