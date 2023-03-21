import axios from 'axios';

const STUDENT_API_BASE_URL = "http://localhost:8081/students";

class StudentService {

    getStudents(){
        return axios.get(STUDENT_API_BASE_URL);
    }

    //register
    createStudent(student){
        return axios.post(STUDENT_API_BASE_URL, student);
    }

    //login
    loginStudent(student){
        return axios.get(STUDENT_API_BASE_URL + '/login', student);
    }

    //get student
    getStudentById(studentId){
        return axios.get(STUDENT_API_BASE_URL + '/' + studentId);
    }

    updateStudent(student, studentId){
        return axios.put(STUDENT_API_BASE_URL + '/' + studentId, student);
    }

    deleteStudent(studentId){
        return axios.delete(STUDENT_API_BASE_URL + '/' + studentId);
    }
}

export default new StudentService()