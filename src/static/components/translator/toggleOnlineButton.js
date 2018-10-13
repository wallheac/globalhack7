import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

function ToggleOnlineButton(props) {
    if(props.online) {
        return <Button onClick={props.toggleOnline}>Go Offline</Button>;
    }
    return <Button onClick={props.toggleOnline}>Go Online!</Button>;
};

ToggleOnlineButton.propTypes = {
    online: PropTypes.bool.isRequired,
    toggleOnline: PropTypes.func.isRequired
};

export default ToggleOnlineButton;
