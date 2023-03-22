//auth.service.js
import axios from 'axios';

const STUDENT_API_BASE_URL = "http://localhost:8081/students";

    //register
    const registerStudent = (firstName, lastName, email, password) => {
        return axios.post(STUDENT_API_BASE_URL + "/register", {
            firstName,
            lastName,
            email,
            password,
        });
    };

    //login
    const loginStudent = (email, password) => {        
        return axios
            .post(STUDENT_API_BASE_URL + "/login", {
                email,
                password,
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user",JSON.stringify(response.data));
                }
                return response.data;
            });
    };

    const getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"));
      };
      
      const StudentService = {
        registerStudent,
        loginStudent,
        getCurrentUser,
      };

    // getStudents(){
    //     return axios.get(STUDENT_API_BASE_URL);
    // }
    //get student
    // getStudentById(studentId){
    //     return axios.get(STUDENT_API_BASE_URL + '/' + studentId);
    // }

    // updateStudent(student, studentId){
    //     return axios.put(STUDENT_API_BASE_URL + '/' + studentId, student);
    // }

    // deleteStudent(studentId){
    //     return axios.delete(STUDENT_API_BASE_URL + '/' + studentId);
    // }

export default StudentService;