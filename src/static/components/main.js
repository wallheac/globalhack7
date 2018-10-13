import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import SelectYourLanguage from "./selectYourLanguage";
import UserChooser from "./userChooser";
// import UserForms from "./UserForms";
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
        return (
            <Grid container>
                <SpokenLanguages
                    onGoOnline={this.onGoOnline}
                />
                {/* {
                    !this.state.language ?
                        <SelectYourLanguage language={this.state.language || "english"} onSelectYourLanguage={this.onSelectYourLanguage} /> :
                        <UserChooser onChooseUser={this.onChooseUser} />
                } */}
            </Grid>
        );
    }
}

export default Main;
