import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: ""
        };
    }

    generate = () => {
        this.setState({number: Math.floor(Math.random() * 0xFFFFFF)});
    }

    join = () => {
        window.open(`/static/room/#${this.state.number.toString(16)}`);
    }

    render() {
        const {number} = this.state;
        return (
            <Grid>
                <Input label="Room Number" value={this.state.number} required/>
                <Button variant="contained" color="primary" onClick={this.generate}>Generate</Button>
                <Button variant="contained" color="primary" onClick={this.join} disabled={!number}>Join</Button>
            </Grid>
        );
    }
}

export default Room;