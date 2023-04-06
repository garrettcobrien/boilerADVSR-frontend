import axios from 'axios';

const STUDENT_API_BASE_URL = "http://localhost:8081/students";

class StudentService {

    //get all students
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

    //get taken courses
    getStudentCourses(studentId) {
        return axios.get(STUDENT_API_BASE_URL + '/' + studentId + '/plan/courses');
    }

    //get courses havent taken yet
    getStudentIncompleted(studentId) {
        return axios.get(STUDENT_API_BASE_URL + '/' + studentId + '/plan/requirements');
    }

    //add course to transcrip
    addCourse(id, course) {
        return axios.post(STUDENT_API_BASE_URL + '/' + id + '/plan/addcourse', course);
    }

    //get student
    getStudentById(studentId){
        return axios.get(STUDENT_API_BASE_URL + '/' + studentId);
    }

    //update student info
    updateStudent(student, studentId){
        return axios.put(STUDENT_API_BASE_URL + '/' + studentId, student);
    }

    //delete student
    deleteStudent(studentId){
        return axios.delete(STUDENT_API_BASE_URL + '/' + studentId);
    }

    //add to backlog
    addToBacklog(studentId, course) {
        return axios.post(STUDENT_API_BASE_URL + '/' + studentId + '/plan/addbacklog', course);
    }

    //get suggested semester given parameters
    getSuggestedSemester(studentId, sort) {
        return axios.get(STUDENT_API_BASE_URL + '/' + studentId + '/plan/courses/suggestedSemester?sort=' + sort);
    }

    //get whole plan of study
    getPlanofStudy(studentId) {
        return axios.get(STUDENT_API_BASE_URL + '/' + studentId + '/plan');
    }

    //get students completed semesters
    getCompletedSemesters(studentId) {
        return axios.get(STUDENT_API_BASE_URL + '/' + studentId + '/plan/semesters');
    }

    //reset password link sent to email
    resetPasswordLink(id) {
        return axios.get(STUDENT_API_BASE_URL + '/change/pass/' + id);
    }

    //reset password
    resetPassword(password, id) {
        return axios.put(STUDENT_API_BASE_URL + '/change/pass/' + id + '/' + password)
    }

    removeBacklog(id, courseID) {
        return axios.post(STUDENT_API_BASE_URL + '/' + id + '/plan/removebacklog/' + courseID);
    }
}

export default new StudentService()