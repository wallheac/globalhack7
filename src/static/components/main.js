import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import SelectYourLanguage from "./selectYourLanguage";
import UserChooser from "./userChooser";
import SpokenLanguages from "./translator/spokenLanguages";

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
                </Grid>
        );
    }
}

export default Main;
