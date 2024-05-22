#! /usr/bin/env node
import inquirer from "inquirer";
class student {
    static counter = 1000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    enrollCourses(courses) {
        this.courses.push(courses);
    }
    balanceCheck() {
        console.log(`This Student's Name is "${this.name}" and her Balance is $${this.balance}`);
    }
    payFees(fees) {
        this.balance -= fees;
        console.log(`The $${fees} Fees has been paid and The Outstanding Balance is $${this.balance}`);
    }
    studentDetail() {
        console.log(`ID : "${this.id}"`);
        console.log(`Name : "${this.name}"`);
        console.log(`Course : "${this.courses}"`);
        console.log(`Balance : "$${this.balance}"`);
    }
}
class studentManager {
    students;
    constructor() {
        this.students = [];
    }
    addStudents(name) {
        let student_ = new student(name);
        this.students.push(student_);
        console.log(`Student : "${name}" added sucessfully, Student ID is : "${student_.id}" `);
    }
    enrollStudents(studentId, course) {
        let findStudent = this.findStudentMethod(studentId);
        if (findStudent) {
            findStudent.enrollCourses(course);
            console.log(`"${student.name}" enroll in *${course}* successfully`);
        }
        else {
            console.log(`Student Not Found. please Enter a Correct Student ID`);
        }
    }
    veiwStudentBalance(studentId) {
        let findStudent = this.findStudentMethod(studentId);
        if (findStudent) {
            findStudent.balanceCheck();
        }
    }
    payStudentFees(studentId, fees) {
        let findStudent = this.findStudentMethod(studentId);
        if (findStudent) {
            findStudent.payFees(fees);
        }
        else {
            console.log(`Student Not Found. please Enter a Correct Student ID`);
        }
    }
    showStudentStatus(studentId) {
        let findStudent = this.findStudentMethod(studentId);
        if (findStudent) {
            findStudent.studentDetail();
        }
    }
    findStudentMethod(studentId) {
        return this.students.find((std) => std.id === studentId);
    }
}
let Student_Management = new studentManager();
async function main() {
    console.log(`=`.repeat(52));
    console.log(`\n\tWelcome To Student Management System\n\t`);
    console.log(`=`.repeat(52));
    while (true) {
        let choises = await inquirer.prompt([
            {
                name: "choise",
                type: "list",
                message: "Select an Option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ],
            },
        ]);
        switch (choises.choise) {
            case "Add Student":
                let nameInput = await inquirer.prompt({
                    name: "name",
                    type: "input",
                    message: "Enter a Student Name",
                });
                Student_Management.addStudents(nameInput.name);
                break;
            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course",
                    },
                ]);
                Student_Management.enrollStudents(courseInput.studentId, courseInput.course);
                break;
            case "View Student Balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                ]);
                Student_Management.veiwStudentBalance(balanceInput.studentId);
                break;
            case "Pay Fees":
                let payFees = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "fees",
                        type: "number",
                        message: "Enter The Amount To Pay",
                    },
                ]);
                Student_Management.payStudentFees(payFees.studentId, payFees.fees);
                break;
            case "Show Status":
                let showStatus = await inquirer.prompt({
                    name: "studentId",
                    type: "number",
                    message: "Enter a Student ID",
                });
                Student_Management.showStudentStatus(showStatus.studentId);
                break;
            case "Exit":
                console.log("Exiting.....");
                process.exit();
        }
    }
}
main();
