import React, {Component} from "react";
import propTypes from "prop-types";
import PhoneForwarded from "@material-ui/icons/PhoneForwarded";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import languages from "../../test/languagesInNative";
import callInformation from "../translateText/callInformation";
export default class CallInformation extends Component {
    static propTypes = {
        chosenLanguage: propTypes.string.isRequired,
        sendCallInformation: propTypes.func,
        lastStep: propTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
            userInput: {
                callerName: null,
                phoneNumber: null,
                message: null,
                voiceLanguage: languages[this.props.chosenLanguage].find(language => {
                    return language.language === "en";
                }).language
            },
            validation: {
                callerName: false,
                phoneNumber: false,
                message: false,
                voiceLanguage: false
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
            if (this.state.userInput[item] === null || this.state.userInput[item] === "") {
                this.setState(prevState => {
                    const validation = prevState.validation;
                    validation[item] = true;
                    return {validation};
                }, () => {
                    const error = Object.values(this.state.validation).some(e => e);
                    if(!error) {
                        this.props.sendCallInformation(this.state.userInput);
                    }
                });
            } else {
                this.setState(prevState => {
                    const validation = prevState.validation;
                    validation[item] = false;
                    return {validation};
                }, () => {
                    const error = Object.values(this.state.validation).some(e => e);
                    if(!error) {
                        this.props.sendCallInformation(this.state.userInput);
                    }
                });
            }
        })
    }

    render() {
        return (
            <Grid container direction="column" spacing={40}>
                <Grid item>
                    <TextField
                        fullWidth
                        value={this.state.userInput.callerName || ""}
                        label={callInformation.CALLERNAME[this.props.chosenLanguage]}
                        onChange={this.updateField("callerName")}
                        error={this.state.validation.callerName}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        value={this.state.userInput.phoneNumber || ""}
                        label={callInformation.PHONENUMBER[this.props.chosenLanguage]}
                        onChange={this.updateField("phoneNumber")}
                        error={this.state.validation.phoneNumber}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        value={this.state.userInput.message || ""}
                        label={callInformation.MESSAGE[this.props.chosenLanguage]}
                        onChange={this.updateField("message")}
                        error={this.state.validation.message}
                        multiline
                        rows="4"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        value={this.state.userInput.voiceLanguage}
                        label={callInformation.VOICELANGUAGE[this.props.chosenLanguage]}
                        onChange={this.updateField("voiceLanguage")}
                        error={this.state.validation.voiceLanguage}
                        select
                    >
                        {languages[this.props.chosenLanguage].map(language =>
                            <MenuItem key={language.language} value={language.language}>
                                {language.name}
                            </MenuItem>
                        )}
                    </TextField>
                </Grid>
                <Grid item container justify="center" alignItems="center">
                    <Grid item style={{paddingRight:"100px"}}>
                        <IconButton onClick={this.props.lastStep} size="large">
                            <KeyboardArrowLeft style={{cursor: "pointer", fontSize: "45px"}} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={this.submitForm} size="large">
                            <PhoneForwarded style={{color: "#87b153", cursor: "pointer", fontSize: "45px"}} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
