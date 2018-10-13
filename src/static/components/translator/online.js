import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ToggleOnlineButton from "./toggleOnlineButton";
import Grid from "@material-ui/core/Grid";


class Online extends PureComponent {
    render() {
        return <Grid item>
            <Typography>You Are Available!</Typography>
            <ToggleOnlineButton online={this.props.online} toggleOnline={this.props.toggleOnline} />
        </Grid>
    };
};

Online.propTypes = {
    online: PropTypes.bool.isRequired,
    toggleOnline: PropTypes.func.isRequired
};

export default Online;