const express = require('express');
const mongoose = require('mongoose');
const mongoClient = require('mongodb').MongoClient;
// mongoose.Promise = global.Promise;
let Student = require('./models/Student');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 4000;
const app = express();
app.use(bodyParser());
app.use(cors());

const mongoURL = 'mongodb://127.0.0.1:27017/studentDataTable';
mongoose.connect(mongoURL, {useNewUrlParser: true});

const db = mongoose.connection;


db.once('open', () => {
    console.log(`Mongodb server has connected on port: 27017`);
});


var lengthOfCollection ;

// mongoClient.connect(mongoURL, function(err, db) {
//     if (err) throw err;
//     let dbo = db.db("studentDataTable");
//     dbo.collection("students").find({}).toArray(function(err, result) {
//         lengthOfCollection = result.length;
//         if (err) {
//             throw err;
//         }
//         console.log(result);
//         console.log(lengthOfCollection);
//         students = result;
//         db.close();
//     });
// });


app.get('/students', (req, res) => {
    Student.find()
        .then(students => {
            // index = students.length;
            res.status(200).json(students);
        })
        .catch(err => {
            res.status(400).send("can't fetch the students");
        })
});

app.post('/add', (req, res) => {
    mongoClient.connect(mongoURL, function(err, db) {
        if (err) throw err;
        let dbo = db.db("studentDataTable");
        dbo.collection("students").find({}).toArray(function(err, result) {
            lengthOfCollection = result.length;
            if (err) {
                throw err;
            }
            console.log(result);
            console.log(lengthOfCollection);
            // students = result;
            db.close();
        });
    });
    let student = new Student(req.body);
    student.id = lengthOfCollection + 1;
    student.save()
        .then(new_student => {
            res.status(200).json(new_student);
        })
        .catch(err => {
            res.status(400).send('adding new student failed');
        });
});


app.delete('/student/:studentId', (req, res) => {
    Student.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(400).send('cannot delete the student');
        } else {
            res.status(200).json();
        }
    })
});

app.put('/edit', (req, res) => {
    let new_s = req.body;
    Student.findById(new_s._id)
        .then(student => {
            student.firstName = new_s.firstName;
            student.lastName = new_s.lastName;
            student.year = new_s.year;
            student.save()
        })
        .then(student => {
            res.status(200).json(student);
        })
        .catch(err => {
            res.status(400).send('cannot update the student');
        })
});


// app.get('/',
//    (req, res) => res.send('Hello World!'));

// let students = [{id: 1, firstName: "Kolio", secondName: "StudentInfo", age: 39},
//     {id: 2, firstName: "Nasko", secondName: "Kamilarov", age: 55}];
//
// app.get('/students',
//     (req, res) => res.json(students));

// app.post('/add', (req, res) => {
//     let new_student = {
//         firstName: req.body.firstName,
//         secondName: req.body.lastName,
//         age: req.body.year,
//         id: students.length + 1
//     };
//     // const new_arr = students.slice(0);
//     students.push(new_student);
//     res.json(students);
//     // res.json(students);
//     // this.setState({students: new_arr.slice(0)});
//
// });

// app.delete('/student/:studentId',
//     (req, res) => {
//         students = students.filter(
//             s => s.id != req.params.studentId
//         );
//         res.json();
//     }
// );

// app.post('/add', (req, res) => {
//     console.log(req.body);
//     res.json(students);
// });



app.listen(port, () => console.log(`Backend API listening on port ${port}!`));
