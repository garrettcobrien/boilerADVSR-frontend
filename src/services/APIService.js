import axios from 'axios'


class APIService {

    getAPICourse(courseIdDepartment, courseIdNumber) {
        var url = `https://api.purdue.io/odata/Courses?$filter=Subject/Abbreviation eq '` + courseIdDepartment + `' and Number eq '` + courseIdNumber + `00'`;
        console.log("url: " + url);
        console.log("Res: " + axios.get(url))
        return axios.get(url);
    }


    getDepartments() {
        return axios.get('http://localhost:8081/degrees/alldept');
    }

    getDegreeList(dep, type) {
        return axios.get("http://localhost:8081/degrees?department=" + dep + "&degree-type=" + type);
    }

    getAllEvents() {
        return axios.get("http://localhost:8081/events/all");
    }
}

export default new APIService()