import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ToggleOnlineButton from "./toggleOnlineButton";


class Online extends PureComponent {
    render (
        <Grid item>
            <Typography>You Are Available!</Typography>
            <ToggleOnlineButton />
        </Grid>
    );
};

Online.propTypes = {

};

Online.defaultProps = {

};

export default Online;