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
import ConnectionConfirmation from "./user/connectionConfirmation";

import Model from "../model/app";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: null,
            userType: null,
            userInformation: null,
            step: "language",
            onlineStatus: false,
            callRequests: null,
            resquestId: null
        };
    }
    getSteps() {
        if(this.state.userType === UserTypes.TRANSLATOR) {
            return ["language", "userType", "translator_spokenLanguages", "translator_onlineStatus", "translator_next"];
        }
        if(this.state.userType === UserTypes.USER) {
            return ["language", "userType", "user_information", "user_callInformation", "user_connected", "user_next"];
        }
        return ["language", "userType"];
    }
    nextStep = () => {
        const steps = this.getSteps();
        //console.log("####! nextStep", steps, this.state.step);
        const currentStepIndex = steps.indexOf(this.state.step);
        this.setState({step: steps[currentStepIndex + 1]});
    }
    lastStep = () => {
        const steps = this.getSteps();
        //console.log("####! nextStep", steps, this.state.step);
        const currentStepIndex = steps.indexOf(this.state.step);
        this.setState({step: steps[currentStepIndex - 1]});
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
        Model.on("state.callRequests", callRequests => {
            console.log("# this.state.step: ", this.state.step);
            this.setState({callRequests}, () => {
                if(this.state.step === "user_callInformation") return this.nextStep();
            })
        });
    }

    // Push changes to service
    onSelectYourLanguage = language => Model.setLanguage(language);
    onChooseUser = userType => Model.setUserType(userType);
    handleToggleOnline = translatorInformation =>  Model.setOnlineStatus({onlineStatus: !this.state.onlineStatus, translatorInformation});
    sendUserInformation = userInformation => Model.setUserInformation(userInformation);
    sendCallInformation = callInformation => {
        const id = Model.requestCall(callInformation);
        this.setState({requestId: id});
    }

    testTranslator() {
        this.onSelectYourLanguage("en");
        Model.once("state.language", () => {
            this.onChooseUser("TRANSLATOR");
        });
        Model.once("state.userType", () => {
            this.handleToggleOnline({name: "Francois", selectedLanguages: ["en", "fr"]});
        });
    }

    testUser() {
        this.onSelectYourLanguage("fr");
        Model.once("state.language", () => {
            this.onChooseUser("USER");
        });
        Model.once("state.userType", () => {
            this.sendUserInformation({
                "name": "Jacques",
                "address":"123 S Main St",
                "alienNumber": "9444222123",
                "passportNumber":"123"
            });
        });
        Model.once("state.userInformation", () => {
            this.sendCallInformation({
                callId: `${Math.floor(Math.random()*100000)}-${Math.floor(Math.random()*100000)}-${Math.floor(Math.random()*100000)}`,
                callerName: 'Someone',
                phoneNumber: '1231231233',
                message: 'aslkdjflaskdf',
                voiceLanguage: 'en'
            });
        });
    }
    render() {
        console.log("### this.state.callRequests: ", this.state.callRequests);
        console.log("### this.state.requestId: ", this.state.requestId);
        return (
            <Grid container alignContent="center" alignItems="center" justify="center" style={{height:"100%"}}>
                    {
                        {
                            "language": () => <SelectYourLanguage language={this.state.language} onSelectYourLanguage={this.onSelectYourLanguage} />,
                            "userType": () => <UserChooser onChooseUser={this.onChooseUser} lastStep={this.lastStep} />,
                            "translator_spokenLanguages": () => <SpokenLanguages handleToggleOnline={this.handleToggleOnline} lastStep={this.lastStep} online={this.state.onlineStatus} />,
                            "translator_onlineStatus": () => <Online online={this.state.onlineStatus} userInformation={this.state.userInformation} toggleOnline={this.handleToggleOnline} />,
                            "translator_next": () => <div>done???(translator)</div>,
                            "user_information": () => <UserInformation chosenLanguage={this.state.language} lastStep={this.lastStep} sendUserInformation={this.sendUserInformation} />,
                            "user_callInformation": () => <CallInformation chosenLanguage={this.state.language} lastStep={this.lastStep} sendCallInformation={this.sendCallInformation} />,
                            "user_next": () => <div>done??? (user)</div>,
                            "user_connected": () => <ConnectionConfirmation status={this.state.callRequests.find(req => req.callId === this.state.requestId)} />
                        }[this.state.step]()
                    }
            </Grid>
        );
    }
}

export default Main;
