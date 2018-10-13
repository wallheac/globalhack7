import React, {PureComponent} from "react";
import Header from "./header";
import CoursesList from "./courseList"

import Model from "../model/app";

class Main extends PureComponent {
    componentDidMount() {
        Model.on("test", () => {
            console.log("test received");
        });
        Model.send("testclient", {message: "hello"});
    }
    render() {
        return (
            <div>
                <Header />
                <CoursesList />
            </div>
        );
    }
}

export default Main;
