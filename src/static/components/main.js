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
import Online from "./translator/online";

import Model from "../model/app";
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: null,
            userType: null,
            userInformation: null,
            step: "language",
            onlineStatus: false
        };
    }
    getSteps() {
        if(this.state.userType === UserTypes.TRANSLATOR) {
            return ["language", "userType", "translator_spokenLanguages", "translator_onlineStatus", "translator_next"];
        }
        if(this.state.userType === UserTypes.USER) {
            return ["language", "userType", "user_information", "user_callInformation", "user_next"];
        }
        return ["language", "userType"];
    }
    nextStep() {
        const steps = this.getSteps();
        //console.log("####! nextStep", steps, this.state.step);
        const currentStepIndex = steps.indexOf(this.state.step);
        this.setState({step: steps[currentStepIndex + 1]});
    }

    componentDidMount() {
        // Handle data update from service
        Model.on("state.userType", userType => {
            this.setState({userType}, () => {
                if(this.state.step === "userType") return this.nextStep();
            });
        });
        Model.on("state.language", language => {
            this.setState({language}, () => {
                if(this.state.step === "language") return this.nextStep();
            });
        });
        Model.on("state.onlineStatus", onlineStatus => {
            this.setState({onlineStatus}, () => {
                if(!onlineStatus) return this.setState({step: "translator_onlineStatus"});
                if(this.state.step === "translator_spokenLanguages" && onlineStatus) return this.nextStep();
            });
        });
        Model.on("state.userInformation", userInformation => {
            this.setState({userInformation}, () => {
                if(this.state.step === "user_information") return this.nextStep();
            });
        });
    }

    // Push changes to service
    onSelectYourLanguage = language => Model.setLanguage(language);
    onChooseUser = userType => Model.setUserType(userType);
    handleToggleOnline = translatorInformation =>  Model.setOnlineStatus({onlineStatus: !this.state.onlineStatus, translatorInformation});
    sendUserInformation = userInformation => Model.setUserInformation(userInformation); 
    sendCallInformation = callInformation => Model.requestCall(callInformation);
    // @TODO add this back
    goBackAStep = () => this.setState(prevState => ({step: prevState.step - 1}));


    render() {
        return (
            <Grid>
                    {
                        {
                            "language": () => <SelectYourLanguage language={this.state.language} onSelectYourLanguage={this.onSelectYourLanguage} />,
                            "userType": () => <UserChooser onChooseUser={this.onChooseUser} />,
                            "translator_spokenLanguages": () => <SpokenLanguages handleToggleOnline={this.handleToggleOnline} online={this.state.onlineStatus} />,
                            "translator_onlineStatus": () => <Online online={this.state.onlineStatus} toggleOnline={this.handleToggleOnline} />,
                            "translator_next": () => <div>done???(translator)</div>,
                            "user_information": () => <UserInformation chosenLanguage={this.state.language} sendUserInformation={this.sendUserInformation} />,
                            "user_callInformation": () => <CallInformation chosenLanguage={this.state.language} sendCallInformation={this.sendCallInformation} />,
                            "user_next": () => <div>done??? (user)</div>,
                        }[this.state.step]()
                    }
            </Grid>
        );
    }
}

export default Main;
