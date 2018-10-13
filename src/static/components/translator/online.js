import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ToggleOnlineButton from "./toggleOnlineButton";
import Grid from "@material-ui/core/Grid";
import CallNotification from "./callNotification";

class Online extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            incomingCall: false
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({incomingCall: false}), 1000);
    }

    render() {
        return (
            <Grid item>
                <Typography>You Are Available!</Typography>
                <ToggleOnlineButton online={this.props.online} toggleOnline={this.props.toggleOnline} />
                <CallNotification show={this.state.incomingCall} />
            </Grid>
        );
    };
};

Online.propTypes = {
    online: PropTypes.bool.isRequired,
    toggleOnline: PropTypes.func.isRequired
};

export default Online;