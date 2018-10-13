import React, {Component} from "react";
import propTypes from "prop-types";
import Lock from "@material-ui/icons/Lock";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import languages from "../../test/languages";
import userInformation from "../translateText/userInformation";

class UserForm extends Component {
    static propTypes = {
        chosenLanguage: propTypes.string.isRequired,
        sendUserInformation: propTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
            userInput: {
                name: null,
                address: null,
                alienNumber: null,
                passportNumber: null
            },
            validation: true
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

    continueForm = () => {
        if (this.state.userInput.name === null || this.state.userInput.name === "") {
            this.setState({validation: false})
        } else {
            this.props.sendUserInformation(this.state.userInput);
        }
    }

    render() {
        return (
            <Grid container direction="column">
                <Grid item>
                    <TextField
                        fullWidth
                        value={this.state.userInput.name || ""}
                        label={userInformation.NAME[this.props.chosenLanguage]}
                        onChange={this.updateField("name")}
                        error={!this.state.validation}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        value={this.state.userInput.address || ""}
                        label={`${userInformation.ADDRESS[this.props.chosenLanguage]} (${userInformation.OPTIONAL[this.props.chosenLanguage]})`}
                        onChange={this.updateField("address")}
                        InputProps={{
                            startAdornment: <Tooltip title={userInformation.TOOLTIP[this.props.chosenLanguage]}><Lock style={{color: "#c10c0c", cursor: "pointer"}}/></Tooltip>
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        value={this.state.userInput.alienNumber || ""}
                        label={`${userInformation.ALIEN[this.props.chosenLanguage]} (${userInformation.OPTIONAL[this.props.chosenLanguage]})`}
                        onChange={this.updateField("alienNumber")}
                        InputProps={{
                            startAdornment: <Tooltip title={userInformation.TOOLTIP[this.props.chosenLanguage]}><Lock style={{color: "#c10c0c", cursor: "pointer"}}/></Tooltip>
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        value={this.state.userInput.passportNumber || ""}
                        label={`${userInformation.PASSPORT[this.props.chosenLanguage]} (${userInformation.OPTIONAL[this.props.chosenLanguage]})`}
                        onChange={this.updateField("passportNumber")}
                        InputProps={{
                            startAdornment: <Tooltip title={userInformation.TOOLTIP[this.props.chosenLanguage]}><Lock style={{color: "#c10c0c", cursor: "pointer"}}/></Tooltip>
                        }}
                    />
                </Grid>

                <Grid item>
                    <Button onClick={this.continueForm} color="primary" size="large" variant="contained">{userInformation.CONTINUE[this.props.chosenLanguage]}</Button>
                </Grid>
            </Grid>
        )
    }
}

export default UserForm;
