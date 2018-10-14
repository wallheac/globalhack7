import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';

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

    sendAddress () {
        //TODO
    }

    sendPassport() {
        //TODO
    }

    sendAlienNumber() {
        //TODO
    }

    render() {
        console.log("userInfo", this.props.userInformation)
        return (
            <Fragment>
                <Grid>
                    {this.props.userInformation && this.props.userInformation.address &&
                        <Grid item>
                            <Button onClick={this.sendAddress}>Address</Button>
                        </Grid>
                    }
                    {this.props.userInformation && this.props.userInformation.passportNumber &&
                        <Grid item>
                            <Button onClick={this.sendPassport}>Passport #</Button>
                        </Grid>
                    }
                    {this.props.userInformation && this.props.userInformation.alienNumber &&
                        <Grid item>
                            <Button onClick={this.sendAlienNumber}>Alien #</Button>
                        </Grid>
                    }
                </Grid>
            </Fragment>
        );
    };
}
SoundBoard.propTypes = {
    userInformation: PropTypes.object
};

SoundBoard.defaultProps = {
    userInformation: null
};

export default withStyles(styles)(SoundBoard);
