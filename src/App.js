import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import {myVariable, myFunction} from './multipleExport';
import StudentsTable from './StudentsTable';
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import StudentInfo from './StudentInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalDelete from './components/ModalDelete';
// import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStudent: null,
            showDeleteModal: false,
            students: []
        };
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    // to do
    showDeleteModel = () => {
        this.setState({show: true});
    };

    deleteStudent = (student) => {
        this.setState({
            showDeleteModal: true,
            selectedStudent: student
        });
    };

    deleteConfirmed = () => {
        const new_arr =
            this.state.students.filter(s =>
                s.id !== this.state.selectedStudent.id);

        this.setState({students: new_arr});
        this.onHide();
    };

    hideModal = () => {
        this.setState({showDeleteModal: false});
    };

    selectedStudent() {
        this.setState({student: this.state.selectedStudent});
    }

    // addStudent = (student) => {
    //   let new_student = {
    // 	firstName: student.firstName,
    // 	secondName: student.lastName,
    // 	age: student.year,
    // 	id: this.state.students.length + 1
    //   };
    // const new_arr = this.state.students.slice(0);
    // new_arr.push(new_student);
    // this.setState({students: new_arr.slice(0)});
    // };


    render() {

        return (
            <div className="container">
                <Router>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink to="/" exact
                                         activeClassName="active" className="nav-link">Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/add"
                                         activeClassName="active" className="nav-link">Add Student
                                </NavLink>
                            </li>
                            {/*  <li className="nav-item">*/}
                            {/*  <NavLink to="/delete"*/}
                            {/*  activeClassName="active" className="nav-link">Delete*/}
                            {/* </NavLink>*/}
                            {/*</li>*/}
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/add">
                            <StudentInfo
                                // onAdd={this.addStudent}
                            />
                        </Route>
                        <Route exact path='/'>
                            <StudentsTable
                                students={this.state.students}
                                onDelete={this.deleteStudent}
                                // student={this.selectedStudent}
                            />
                        </Route>
                        <Route exact path='/delete'>
                            <ModalDelete
                                show={this.state.showDeleteModel}
                                onConfirm={this.deleteConfirmed}
                                onHide={this.hideModal}
                                student={this.state.selectedStudent}
                                // onDelete={this.deleteStudent}
                            />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
 