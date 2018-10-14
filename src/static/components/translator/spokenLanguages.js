import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ToggleOnlineButton from "./toggleOnlineButton";
import Languages from "../../test/languages";

class SpokenLanguages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            selectedLanguages: []
        }
    }

    onSelectLanguage = event => {
        if(!this.props.online) {
            this.setState(prevState => {
                const selectedLanguages = prevState.selectedLanguages;
                selectedLanguages.push(event.target.value);
                return {selectedLanguages};
            });
        }
    };

    onDeleteChip = item => () => {
        if(!this.props.online) {
            this.setState(prevState => {
                const selectedLanguages = prevState.selectedLanguages;
                const indexToDelete = this.state.selectedLanguages.indexOf(item);
                if(selectedLanguages && selectedLanguages.length > 1) {
                    const beginning = selectedLanguages.slice(0, indexToDelete);
                    const end = selectedLanguages.slice(indexToDelete + 1);
                    return {selectedLanguages: beginning.concat(end)}
                }
                return {selectedLanguages: []}
            });
        }
    };

    onToggleOnline = () => {
        if(this.state.name && Array.isArray(this.state.selectedLanguages) && this.state.selectedLanguages.length > 0) {
            this.props.handleToggleOnline({name: this.state.name, selectedLanguages: this.state.selectedLanguages});
        }
    }

    onChangeName = event => this.setState({name: event.target.value});

    render() {
        const languages = Languages.filter(language => !this.state.selectedLanguages.includes(language.language));
        const hasLanguages = languages && Array.isArray(languages) && languages.length > 0;
        return (
            <Grid item container direction="column" style={{margin:"10px"}}>
                <Grid item>
                    <TextField
                        fullWidth
                        disabled={this.props.online}
                        label="Name"
                        onChange={this.onChangeName}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        select
                        fullWidth
                        disabled={languages.length === 0 || this.props.online}
                        label="Please Select Your Language"
                        placeholder="Please Select Your Language"
                        value=""
                        onChange={this.onSelectLanguage}>
                        {
                            hasLanguages ? languages.map(language => (
                                <MenuItem
                                    key={language.language}
                                    value={language.language}>
                                    {language.name}
                                </MenuItem>
                            )) :
                            <MenuItem>null</MenuItem>
                        }
                    </TextField>
                    {
                        this.state.selectedLanguages
                            .map(languageValue => {
                                const language = Languages.find(lang => lang.language === languageValue);
                                console.log("language: ", language);
                                return <Chip
                                    key={language.language}
                                    label={language.name}
                                    value={language.language}
                                    onDelete={this.onDeleteChip(language.language)}
                                />
                            })
                    }
                </Grid>
                <Grid item container justify="center" alignItems="center">
                    <Grid item style={{paddingRight:"100px"}}>
                        <IconButton onClick={this.props.lastStep} size="large">
                            <KeyboardArrowLeft style={{cursor: "pointer", fontSize: "45px"}} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <ToggleOnlineButton online={this.props.online} toggleOnline={this.onToggleOnline} />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
};

SpokenLanguages.propTypes = {
    handleToggleOnline: PropTypes.func.isRequired,
    online: PropTypes.bool.isRequired,
    lastStep: PropTypes.func
};

export default SpokenLanguages;
