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
        return (
            <Fragment>
                <Grid>
                    {this.props.address &&
                        <Grid item>
                            <Button onClick={this.sendAddress}>Address</Button>
                        </Grid>
                    }
                    {this.props.passportNumber &&
                        <Grid item>
                            <Button onClick={this.sendPassport}>Passport #</Button>
                        </Grid>
                    }
                    {this.props.alienNumber &&
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
    classes: PropTypes.object.isRequired,
    address: PropTypes.string,
    passportNumber: PropTypes.string,
    alienNumber: PropTypes.string
};

SoundBoard.defaultProps = {
    address: null,
    passportNumber: null,
    alienNumber: null
};

export default withStyles(styles)(SoundBoard);
