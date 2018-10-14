import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ToggleOnlineButton from "./toggleOnlineButton";
import Grid from "@material-ui/core/Grid";
import CallNotification from "./callNotification";
import Model from "../../model/app";

class Online extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            callInformation: null
        }
    }

    componentDidMount() {
        Model.on("state.callInformation", callInformation => {
            this.setState({callInformation});
        });
    }

    shouldShowModal() {
        return Boolean(this.state.callInformation && this.state.callInformation.status === "AWAITING_RESPONSE");
    }

    onAcceptCall = () => {
        Model.acceptCall();
    }

    onDeclineCall = () => this.setState({incomingCall: false});

    render() {
        return (
            <Grid item>
                <Typography>You Are Available!</Typography>
                <ToggleOnlineButton online={this.props.online} toggleOnline={this.props.toggleOnline} />
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
    toggleOnline: PropTypes.func.isRequired
};

export default Online;