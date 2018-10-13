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
import UserInformation from "./user/userInformation"
import CallInformation from "./user/callInformation"

import Model from "../model/app";
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // requestedLanguage: null,
            // requestedUserType: null,
            language: null,
            userType: null,
            step: 0
        };
    }

    onSelectYourLanguage = language => this.setState({language, step: 1});

    onChooseUser = userType => this.setState({userType, step: 2});

    onGoOnline = data => console.log("### this is the data: ", data);

    goBackAStep = () => this.setState(prevState => ({step: prevState.step - 1}));

    sendUserInformation = userInformation => {
        console.log("userInformation!", userInformation);
        this.setState({step: 3});
    }

    sendCallInformation = callInformation => {
        console.log("callInformation!!", callInformation);
        this.setState({step: 4});
    }


    // onSelectYourLanguage = requestedLanguage => {
    //     this.setState({requestedLanguage, step: 1});
    //     Model.setNativeLanguage(requestedLanguage);
    // }

    // onChooseUser = requestedUserType => {
    //     this.setState({requestedUserType});
    //     Model.setRole(requestedUserType);
    // }

    // componentDidMount() {
    //     Model.on("test", () => {
    //         console.log("test received");
    //     });
    //     Model.send("api.test", {message: "hello"});
    //     Model.on("state.role", userType => {
    //         this.setState({userType});
    //     });
    // }

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
                                [UserTypes.USER]: <UserInformation chosenLanguage="en" sendUserInformation={this.sendUserInformation} />
                            }[userType]),
                            3: userType => ({
                                [UserTypes.TRANSLATOR]: <h1></h1>,
                                [UserTypes.USER]: <CallInformation chosenLanguage="en" sendCallInformation={this.sendCallInformation} />
                            }[userType]),
                            4: userType => ({
                                [UserTypes.TRANSLATOR]: <h1></h1>,
                                [UserTypes.USER]: <h1>step 4</h1>
                            }[userType]),
                        }[this.state.step](this.state.userType)
                    }
                    {/* Requested User Type: {this.state.requestedUserType}
                    User Type: {this.state.userType}
                    <button onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        this.onChooseUser("USER");
                    }}>User</button>
                    <SpokenLanguages
                        onGoOnline={this.onGoOnline}
                        languageOptions={[
                            {label: "English", value: "english"},
                            {label: "Eskimo", value: "eskimo"},
                            {label: "Potato Language", value: "potato_language"},
                            {label: "Swiss", value: "swiss"}
                        ]}
                    />
                    <Grid container item>
                        <UserInformation />
                    </Grid>
                    <Grid container item>
                        <CallInformation />
                    </Grid> */}
                </Grid>
            </Fragment>
        );
    }
}

export default Main;
