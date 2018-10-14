import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ToggleOnlineButton from "./toggleOnlineButton";
import Grid from "@material-ui/core/Grid";
import CallNotification from "./callNotification";
import Model from "../../model/app";
import TranslationDisplay from "./translationDisplay";

class Online extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            callInformation: null
        }
    }

    // this.state.callInformation.callId

    componentDidMount() {
        Model.on("state.callInformation", callInformation => {
            this.setState({callInformation});
        });
    }

    shouldShowModal() {
        return Boolean(this.state.callInformation && this.state.callInformation.status === "AWAITING_RESPONSE");
    }

    onAcceptCall = () => {
        window.open(`/static/room/?callId=${this.state.callInformation.callId}`);
        Model.acceptCall();
    }

    onDeclineCall = () => this.setState({callInformation: null});

    render() {
        console.log("### this.state: ", this.state);
        return (
            <Grid item>
                {
                    this.state.callInformation && this.state.callInformation.status === "CONNECTED" ?
                        <TranslationDisplay
                            name={this.state.callInformation.callerName}
                            phoneNumber={this.state.callInformation.phoneNumber}
                            textToTranslate={this.state.callInformation.message}
                            userInformation={this.state.callInformation.privateFields}
                        /> :
                        <div>
                            <Typography>You Are Available!</Typography>
                            <ToggleOnlineButton online={this.props.online} toggleOnline={this.props.toggleOnline} />
                        </div>
                }
                <CallNotification
                    show={this.shouldShowModal()}
                    onAcceptCall={this.onAcceptCall}
                    onDeclineCall={this.onDeclineCall}
                />
            </Grid>
        );
    };
};

Online.propTypes = {
    online: PropTypes.bool.isRequired,
    toggleOnline: PropTypes.func.isRequired,
    userInformation: PropTypes.object
};
Online.defaultProps = {
    userInformation: {}
};

export default Online;
