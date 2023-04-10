import axios from 'axios'

const COURSE_API_BASE_URL = "http://localhost:8081/courses";

class CourseService {

    getCourse(courseID) {
        return axios.get(COURSE_API_BASE_URL + '/' + courseID + '/');
    }
}

export default new CourseService()