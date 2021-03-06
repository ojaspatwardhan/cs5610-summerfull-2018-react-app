let _singleton = Symbol();
// const COURSE_API_URL = 'http://localhost:8080/api/course';
// const COURSE_API_URL_2 = "http://localhost:8080/api/course/findCourseByCourseName/courseName"

const COURSE_API_URL = 'https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/course';
const COURSE_API_URL_2 = "https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/course/findCourseByCourseName/courseName"


export default class CourseService {
   constructor(singletonToken) {
       if (_singleton !== singletonToken)
           throw new Error('Cannot instantiate directly.');
   }

   static get instance() {
       if(!this[_singleton])
           this[_singleton] = new CourseService(_singleton);
       return this[_singleton]
   }

   createCourse(course) {
     return fetch(COURSE_API_URL, {
        body: JSON.stringify(course),
        headers: {
           'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(function (response) {
        return response.json();
  });
 }

    deleteCourse(courseId) {
      return fetch(COURSE_API_URL + '/' + courseId,
   {
       method: 'DELETE'
   }).then(function (response) {
       return response;
   })
  }

    findAllCourses() {
        return fetch(COURSE_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    findCourseByCourseName(courseName) {
      return fetch(COURSE_API_URL_2.replace("courseName", courseName)).then(function (response) {
        return response.json();
      });
    }
}
