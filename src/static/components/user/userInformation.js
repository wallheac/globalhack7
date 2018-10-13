import React, {Component} from "react";
import propTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import languages from "../../test/languages";
import languages2 from "../../test/languages2";
import userInformation from "../translateText/userInformation";
class UserForm extends Component {
    static propTypes = {
        chosenLanguage: propTypes.string.isRequired
    }
    static defaultProps = {
        chosenLanguage: "en"
    }
    constructor(props) {
        super(props);
        this.state = {
            userInput: {
                name: null,
                address: null,
                selectedNativeLanguage: null,
                selectedLanguage: null,
                details: null,
                phoneNumber: null
            },
            validation: {
                name: null,
                address: null,
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
                <Grid container spacing={40} style={{padding: 24}}>
                    <form>
                        <Grid item>
                            <TextField
                                fullWidth
                                value={this.state.userInput.firstName || ""}
                                label={userInformation.NAME[this.props.chosenLanguage]}
                                onChange={this.updateField("firstName")}
                                error={this.state.validation.firstName}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                value={this.state.userInput.address || ""}
                                label={userInformation.ADDRESS[this.props.chosenLanguage]}
                                onChange={this.updateField("address")}
                                error={this.state.validation.address}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                value={this.state.userInput.phoneNumber || ""}
                                label={userInformation.PHONENUMBER[this.props.chosenLanguage]}
                                onChange={this.updateField("phoneNumber")}
                                error={this.state.validation.phoneNumber}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                               fullWidth
                               label={userInformation.DETAILS[this.props.chosenLanguage]}
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
                        <Grid item>
                            <Button onClick={this.submitForm} color="primary" size="large" variant="contained">Submit</Button>
                        </Grid>
                    </form>
                </Grid>
            </div>
        )
    }
}

export default UserForm;
