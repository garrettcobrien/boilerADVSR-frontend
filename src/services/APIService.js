import axios from 'axios'


class APIService {

    getAPICourse(courseIdDepartment, courseIdNumber) {
        var url = `https://api.purdue.io/odata/Courses?$filter=Subject/Abbreviation eq '` + courseIdDepartment + `' and Number eq '` + courseIdNumber + `00'`;
        console.log("url: " + url);
        console.log("Res: " + axios.get(url))
        return axios.get(url);
    }

}

export default new APIService()