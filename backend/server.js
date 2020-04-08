const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 4000;
const app = express();
app.use(bodyParser());
app.use(cors());

// app.get('/',
//    (req, res) => res.send('Hello World!'));

let students = [{id: 1, firstName: "Kolio", secondName: "StudentInfo", age: 39},
    {id: 2, firstName: "Nasko", secondName: "Kamilarov", age: 55}];

app.get('/students',
    (req, res) => res.json(students));

app.post('/add', (req, res) => {
    let new_student = {
        firstName: req.body.firstName,
        secondName: req.body.lastName,
        age: req.body.year,
        id: students.length + 1
    };
    // const new_arr = students.slice(0);
    students.push(new_student);
    res.json(students);
    // res.json(students);
    // this.setState({students: new_arr.slice(0)});

});

app.delete('/student/:studentId',
    (req, res) => {
        students = students.filter(
            s => s.id != req.params.studentId
        );
        res.json();
    }
);

// app.post('/add', (req, res) => {
//     console.log(req.body);
//     res.json(students);
// });



app.listen(port, () => console.log(`Backend API listening on port ${port}!`));
