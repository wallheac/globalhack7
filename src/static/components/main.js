import React, {Component, Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SelectYourLanguage from "./selectYourLanguage";
import UserChooser from "./userChooser";
import SpokenLanguages from "./translator/spokenLanguages";
import UserTypes from "./enums/userTypes";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: null,
            userType: null,
            step: 0
        };
    }

    onSelectYourLanguage = language => this.setState({language, step: 1});

    onChooseUser = userType => this.setState({userType, step: 2});

    onGoOnline = data => console.log("### this is the data: ", data);

    goBackAStep = () => this.setState(prevState => ({step: prevState.step - 1}));

    render() {
        return (
            <Fragment>
                <Grid container>
                    {this.state.step > 0 && <Button onClick={this.goBackAStep}>Go Back!</Button>}
                    {
                        {
                            0: () => <SelectYourLanguage language={this.state.language} onSelectYourLanguage={this.onSelectYourLanguage} />,
                            1: () => <UserChooser onChooseUser={this.onChooseUser} />,
                            2: userType => ({
                                [UserTypes.TRANSLATOR]: <SpokenLanguages languageOptions={[{label: "English", value: "english"}]} onGoOnline={this.onGoOnline} />,
                                [UserTypes.USER]: <h1>You're on the User path...</h1>
                            }[userType]),
                        }[this.state.step](this.state.userType)
                    }
                </Grid>
            </Fragment>
        );
    }
}

export default Main;
