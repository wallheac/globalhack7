import React, {Component} from "react"
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import languages from "../test/languages"
import languages2 from "../test/languages2"
class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: {
                selectedNativeLanguage: null,
                selectedLanguage: null,
                details: null,
                phoneNumber: null
            },
            validation: {
                selectedNativeLanguage: false,
                selectedLanguage: false,
                details: false,
                phoneNumber: false
            }
        };
    }

    componentDidMount() {
    }

    updateField = inputName => (event) => {
        const target = event.target;
        this.setState(prevState => {
            const userInput = prevState.userInput;
            userInput[inputName] = target.value;
            return {userInput};
        });
    };

    submitForm = () => {
        Object.keys(this.state.validation).map(item => {
            if (this.state.userInput[item] === null) {
                this.setState(prevState => {
                    const validation = prevState.validation;
                    validation[item] = true;
                    return {validation};
                }, () => {
                    const error = Object.values(this.state.validation).some(e => e);
                    if(!error) {
                        // call service
                    }
                });
            }
        })
        console.log("done!", this.state.userInput);
    }

    render() {
        return (
            <div>
                <Grid container spacing={24} style={{padding: 24}}>
                    <Grid container item xs={12} sm={6} lg={4} xl={3}>
                        <form>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    value={this.state.userInput.selectedNativeLanguage || languages[0].name}
                                    label="Native Language"
                                    onChange={this.updateField("selectedNativeLanguage")}
                                    error={this.state.validation.selectedNativeLanguage}
                                    select
                                >
                                    {languages.map(language =>
                                        <MenuItem key={language.language} value={language.name}>
                                            {language.name}
                                        </MenuItem>
                                    )}
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    value={this.state.userInput.phoneNumber || ""}
                                    label="Phone Number"
                                    onChange={this.updateField("phoneNumber")}
                                    error={this.state.validation.phoneNumber}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                   fullWidth
                                   label="Details"
                                   onChange={this.updateField("details")}
                                   error={this.state.validation.details}
                                   multiline
                                   rows="4"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    value={this.state.userInput.selectedLanguage || languages2[0].name}
                                    label="Converted Language"
                                    onChange={this.updateField("selectedLanguage")}
                                    error={this.state.validation.selectedLanguage}
                                    select
                                >
                                    {languages2.map(language =>
                                        <MenuItem key={language.language} value={language.name}>
                                            {language.name}
                                        </MenuItem>
                                    )}
                                </TextField>
                            </Grid>
                            <Button onClick={this.submitForm} color="primary" size="large" variant="contained">Submit</Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default UserForm;
