import React, {Component} from "react";
import propTypes from "prop-types";
import Lock from "@material-ui/icons/Lock";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import languages from "../../test/languages";
import userInformation from "../translateText/userInformation";

export default class UserInformation extends Component {
    static propTypes = {
        chosenLanguage: propTypes.string.isRequired,
        sendUserInformation: propTypes.func,
        lastStep: propTypes.func
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
            <Grid container direction="column" spacing={40}>
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

                </Grid>
                <Grid item container justify="center" alignItems="center">
                    <Grid item style={{paddingRight:"100px"}}>
                        <IconButton onClick={this.props.lastStep} size="large">
                            <KeyboardArrowLeft style={{cursor: "pointer", fontSize: "45px"}} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={this.continueForm} size="large">
                            <KeyboardArrowRight style={{cursor: "pointer", fontSize: "45px"}} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
