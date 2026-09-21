const express = require("express");
const router = express.Router();

const students = require("../data/student");

router.get("/", (req, res) => {
  res.json(students);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

router.post("/", (req, res) => {
  const { name, course, age } = req.body;

  if (!name || !course || !age) {
    return res.status(400).json({ message: "Name, course and age are required" });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    course,
    age,
  };

  students.push(newStudent);
  res.status(201).json({ message: "Student added", student: newStudent });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, course, age } = req.body;

  if (!name || !course || !age) {
    return res.status(400).json({ message: "Name, course and age are required" });
  }

  student.name = name;
  student.course = course;
  student.age = age;

  res.json({ message: "Student updated", student });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1)[0];
  res.json({ message: "Student deleted", student: deletedStudent });
});

module.exports = router;