import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
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
        window.open(`/static/room/#${this.state.number.toString()}`);
    }

    handleChange = event => {
        const {value} = event.target;
        if(!value) {
            this.setState({number: ""});
        } else if(value.match(/^[0-9]{0,7}$/)) {
            this.setState({number: parseInt(value)});
        }
    }

    render() {
        const {number} = this.state;
        return (
            <Grid>
                <TextField label="Room Number" value={this.state.number} required onChange={this.handleChange}/>
                <Button variant="contained" color="primary" onClick={this.generate}>Create Room</Button>
                <Button variant="contained" color="primary" onClick={this.join} disabled={!number}>Join</Button>
            </Grid>
        );
    }
}

export default Room;