import React, {PureComponent} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Model from "../../model/app";
import Button from "@material-ui/core/Button";
import TranslationDisplay from "../translator/translationDisplay";
import UserInformation from "./userInformation";
import SelectYourLanguage from "../selectYourLanguage";


class CallTransmitting extends PureComponent {
    state = {
        callInformation: null
    };

    // this.state.callInformation.callId

    componentDidMount() {
        Model.on("state.callInformation", callInformation => {
            this.setState({callInformation});
        });
    }

    render() {
        console.log("### this.state.callInformation: ", this.state.callInformation)
        return (
            <Grid item>
                {
                    this.state.callInformation && this.state.callInformation.status !== "CONNECTED" ?
                        <div>
                            <Typography>Your voice has been heard</Typography>
                            <Button onClick={this.handleUserClick(TranslationDisplay)} color="#B9B0A2" size="large" variant="contained">Notes</Button>
                            <Button onClick={this.handleUserClick(UserInformation)} color="#87B153" size="large" variant="contained">Start Over</Button>
                            <Button onClick={this.handleUserClick(SelectYourLanguage)} color="#C10C0C" size="large" variant="contained">Exit</Button>
                        </div> :
                        <div>
                            <Typography>Your voice is being transmitted</Typography>
                        </div>
                }
            </Grid>
        );
    };
}

CallTransmitting.propTypes = {
};

export default CallTransmitting;