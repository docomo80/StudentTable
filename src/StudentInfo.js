import React from 'react';
import LabelText from './LabelText';
import {withRouter} from 'react-router';
import axios from 'axios';
import "./StudentInfo.css"

class StudentInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            year: ""
        };
        this.saveClicked = this.saveClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeText = this.changeText.bind(this);
        this.onAddStudent = this.onAddStudent.bind(this);
    }

    clearClicked() {
        // this.setState({state: null});
    }


    saveClicked(e) {
        e.preventDefault();
        // console.log(this.state);
        // this.props.onAdd(this.state);
        axios.post("http://localhost:4000/add", this.state)
            .then(() => {
                this.clearClicked();
                // this.props.history.push("/");
            })

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    changeText(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    onAddStudent(e) {
        e.preventDefault();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="form-group" >
                <form>
                    <h3>Student Info</h3>
                    <LabelText label="First name" name="firstName"
                               onChange={this.changeText}
                               value={this.state.firstName} />
                    <LabelText label="Last name" name="lastName"
                               onChange={this.changeText}
                               value={this.state.lastName}/>
                    <LabelText label="Year" name="year"
                               onChange={this.changeText}
                               value={this.state.year}/>
                    <input type="text"
                           id={this.state.name}
                           value={this.state.value}
                           onChange={this.handleChange}
                           className="form-control"/>

                    <textarea value={this.state.someText} onChange={this.handleChange} className="form-control"/>
                    <select value={this.state.someOption} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>

                    <button onClick={this.saveClicked} className="btn btn-success">Save</button>
                    <button onClick={this.clearClicked} className="btn btn-danger">Clear</button>
                    <button onClick={this.onAddStudent} className="btn btn-info">Add</button>
                </form>
            </div>
        )
    }
}

export default withRouter(StudentInfo);
