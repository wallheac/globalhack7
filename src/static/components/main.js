import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import SelectYourLanguage from "./selectYourLanguage";
import UserChooser from "./userChooser";
import SpokenLanguages from "./translator/spokenLanguages";

import Model from "../model/app";
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestedLanguage: null,
            requestedUserType: null,
            language: null,
            userType: null
        };
    }

    onSelectYourLanguage = requestedLanguage => {
        this.setState({requestedLanguage});
        Model.setNativeLanguage(requestedLanguage);
    }

    onChooseUser = requestedUserType => {
        this.setState({requestedUserType});
        Model.setRole(requestedUserType);
    }

    onGoOnline = () => {
        console.log("Go Online!");
    }

    componentDidMount() {
        Model.on("test", () => {
            console.log("test received");
        });
        Model.send("api.test", {message: "hello"});
        Model.on("state.role", userType => {
            this.setState({userType});
        });
    }
    render() {
        const language = this.state.language || "english";
        return (
                <Grid container>
                    Requested User Type: {this.state.requestedUserType}
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
                </Grid>
        );
    }
}

export default Main;
