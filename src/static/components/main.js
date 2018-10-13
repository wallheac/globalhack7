import React, {PureComponent} from "react";
import Header from "./header";
import CoursesList from "./courseList"

import Model from "../model/app";

class Main extends PureComponent {
    componentDidMount() {
        Model.on("test", () => {
            console.log("test received");
        });
        Model.send("api.test", {message: "hello"});
    }
    render() {
        return (
            <div>
                <Header />
            </div>
        );
    }
}

export default Main;
