import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import UserTypes from "./enums/userTypes";

class UserForms extends PureComponent {
    render() {
        return <Typography>You are a {UserTypes[this.props.userType]} and your language is {this.props.language}</Typography>;
    }
}

UserForms.propTypes = {
    userType: PropTypes.oneOf(Object.values(UserTypes))
    language: PropTypes.string
}

UserForms.defaultProps = {
    userType: null,
    language: null
}

export default UserForms;
