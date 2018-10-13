import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import SelectYourLanguage from "./selectYourLanguage";
import UserChooser from "./userChooser";
import SpokenLanguages from "./translator/spokenLanguages";
import UserInformation from "./user/userInformation"
import CallInformation from "./user/callInformation"

import Model from "../model/app";
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: null,
            userType: null
        };
    }

    onSelectYourLanguage = language => this.setState({language});

    onChooseUser = userType => this.setState({userType});

    onGoOnline = () => console.log("Go Online!");

    componentDidMount() {
        Model.on("test", () => {
            console.log("test received");
        });
        Model.send("api.test", {message: "hello"});
    }
    render() {
        const language = this.state.language || "english";
        return (
                <Grid container>
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
                    </Grid>
                </Grid>
        );
    }
}

export default Main;
