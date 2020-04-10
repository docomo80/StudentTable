import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import ReactDOM from "react-dom";
import './Modal-css.css';
import axios from 'axios';

export default function ModalDelete(props) {

    function getName() {
        if (!props.student) return "";
        return `${props.student.firstName} ${props.student.lastName} `;
    }

    function deleteClicked() {
        axios.delete(`http://localhost:4000/student/${props.student.studentId}`)
            .then(() => {
                // props.onHide();
            })
    }

    function editClicked() {
        axios.delete(`http://localhost:4000/student/${props.student.studentId}`)
        	.then(() => {
        		// props.onHide();
        	})
    }

    return (
        <Modal
            show={props.show}
            centered aria-labelledby="modal-title">
            <Modal.Header>
                <Modal.Title id="modal-title">Delete Student
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure?</h4>
                <p>
                    The information for student
                    {getName()}
                    will be deleted and cannot be recovered!
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={deleteClicked}
                >Delete</Button>
                <Button
                    onClick={props.onHide}
                >Cancel</Button>
                <Button
                    onClick={editClicked}
                >Edit</Button>
            </Modal.Footer>
        </Modal>


    );
    // const container = document.createElement("div");
    // document.body.appendChild(container);
    // ReactDOM.render(<ModalDelete />, container);
}
