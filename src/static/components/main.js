import React, {PureComponent} from "react";
import Header from "./header";
import CoursesList from "./courseList"
import UserForm from "./userForm"

class Main extends PureComponent {
    render() {
        return (
            <div>
                <Header />
                <UserForm />
            </div>
        );
    }
}

export default Main;
