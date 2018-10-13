import React, {Component} from "react";
import propTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import languages from "../../test/languages";
import languages2 from "../../test/languages2";
import callInformation from "../translateText/callInformation";
class UserForm extends Component {
    static propTypes = {
        chosenLanguage: propTypes.string.isRequired
    }
    static defaultProps = {
        chosenLanguage: "fr"
    }
    constructor(props) {
        super(props);
        this.state = {
            userInput: {
                callerName: null,
                phoneNumber: null,
                message: null
            },
            validation: {
                callerName: null,
                phoneNumber: null,
                message: null
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
                            />
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
