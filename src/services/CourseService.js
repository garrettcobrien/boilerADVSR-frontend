import axios from 'axios'

const COURSE_API_BASE_URL = "http://localhost:8081/courses";

class CourseService {
    //get all courses
    getCourses() {
        return axios.get(COURSE_API_BASE_URL);
    }

    //get course by id
    getCourse(courseID) {
        return axios.get(COURSE_API_BASE_URL + '/' + courseID);
    }

    //search by department
    getDepartment(department) {
        return axios.get(COURSE_API_BASE_URL + '?department=' + department);
    }

    //add review
    addReview(courseID, id, text, rating) {
         console.log(rating);
        return axios({
            method: 'put',
            url: COURSE_API_BASE_URL + '/' + courseID + '/addreview',
            data: {
                studentID: id,
                courseID: courseID,
                reviewText: text,
                rating: rating
            }
        });
    }
}

export default new CourseService()