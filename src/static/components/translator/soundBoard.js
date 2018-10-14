import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Model from "../../model/app";

const styles = theme => ({
    root: {
        color: 'inherit',
        textDecoration: 'inherit',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    soundboard: {
        backgroundColor: "red"
    }
});

class SoundBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    sendItem = field => () => Model.sendPrivate(field);

    render() {
        console.log("userInfo", this.props.userInformation)
        const fields = {
            address: "Address",
            alienNumber: "Alien #",
            passportNumber: "Passport #"
        };
        return (
            <Fragment>
                <Grid item container spacing={24}>
                    {
                        this.props.userInformation && this.props.userInformation.map(info => <Grid key={info} item>
                                <Button variant="contained" color="secondary" onClick={this.sendItem(info)}>{fields[info]}</Button>
                            </Grid>)
                    }
                </Grid>
            </Fragment>
        );
    };
}
SoundBoard.propTypes = {
    userInformation: PropTypes.array
};

SoundBoard.defaultProps = {
    userInformation: null
};

export default withStyles(styles)(SoundBoard);
