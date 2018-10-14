import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Hearing from "@material-ui/icons/Hearing";

function ToggleOnlineButton(props) {
    if(props.online) {
        return (
            <IconButton onClick={props.toggleOnline} size="large">
                <Hearing style={{color: "#828688", cursor: "pointer", fontSize: "45px"}} />
            </IconButton>
        )
    }
    return (
        <IconButton onClick={props.toggleOnline} size="large">
            <Hearing style={{color: "#87b153", cursor: "pointer", fontSize: "45px"}} />
        </IconButton>
    )
};

ToggleOnlineButton.propTypes = {
    online: PropTypes.bool.isRequired,
    toggleOnline: PropTypes.func.isRequired
};

export default ToggleOnlineButton;
