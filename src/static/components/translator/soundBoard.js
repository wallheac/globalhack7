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

    render() {
        return (
            <Fragment>
                <Grid>
                    <Grid item>
                        <Button>Address</Button>
                    </Grid>
                    <Grid item>
                        <Button>Passport #</Button>
                    </Grid>
                    <Grid item>
                        <Button>Alien #</Button>
                    </Grid>
                </Grid>
            </Fragment>
        );
    };
}
SoundBoard.propTypes = {
    classes: PropTypes.object.isRequired
};

SoundBoard.defaultProps = {
};

export default withStyles(styles)(SoundBoard);
