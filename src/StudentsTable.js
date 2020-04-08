import React from 'react';
import axios from 'axios';
import ModalDelete from "./components/ModalDelete";
// import ModalDelete from "./components/ModalDelete";
// import App from "./App";
// import {withRouter} from "react-router";

// import StudentInfo from 'StudentInfo';

function TableHeader() {
    return (
        <thead className="thead-dark">
        <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Second Name</th>
            <th>Year</th>
            <th>Delete</th>
        </tr>
        </thead>
    );
}

function TableRow(props) {
    return (<tr>
            <td>{props.student.id}</td>
            <td>{props.student.firstName}</td>
            <td>{props.student.secondName}</td>
            <td>{props.student.age}</td>
            <td>
                <a href="/delete" onClick={() =>
                    props.onDelete(props.student)}
                >delete</a>
            </td>
        </tr>
    )
}

class StudentsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: []
        };

        axios.get("http://localhost:4000/students")
            .then((res) =>
                this.setState({students: res.data}));
    }

    getRows() {
        return this.state.students
            .map((student) => <TableRow key={student.id}
                                        student={student}
                                        onDelete={this.props.onDelete}
                />
            );
    }

    render() {
        return (

            this.state.students.length === !0 ? (
                <h4>There are no registered students</h4>
            ) : (
                <div>
                    <h4>Students</h4>
                    <table className="table table-striped">
                        <TableHeader/>
                        <tbody>
                        {this.getRows()}
                        </tbody>
                    </table>
                    {/*<ModalDelete student={this.state.selectedStudent}/>*/}
                </div>
            )
        )
    }
}

export default StudentsTable;
