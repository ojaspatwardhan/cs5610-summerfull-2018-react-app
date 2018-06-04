let _singleton = Symbol();
const LESSON_API_URL = 'http://localhost:8080/api/module/MID/lesson';
const LESSON_API_URL_2 = "http://localhost:8080/api/lesson"

export default class LessonService {
 constructor(singletonToken) {
   if (_singleton !== singletonToken)
     throw new Error('Singleton!!!');
 }

 createLesson(moduleId, lesson) {
   return fetch(LESSON_API_URL.replace('MID', moduleId),
   {
     body: JSON.stringify(lesson),
     headers: { 'Content-Type': 'application/json' },
     method: 'POST'
   }).then(function (response){
     return response.json();
   });
 }

 findAllLessonsForModule(moduleId) {
   return fetch(
      LESSON_API_URL
         .replace('MID', moduleId))
      .then(function(response) {
         return response.json();
      });
 }

 deleteLesson(id) {
   return fetch(LESSON_API_URL_2 + "/" + id, {
     method: "DELETE"
   }).then(function (response) {
     return response;
   });
 }

 findAllLessons() {
   return fetch(LESSON_API_URL_2).then(function(response) {
     return response.json();
   });
 }

 static get instance() {
   if(!this[_singleton])
     this[_singleton] = new LessonService(_singleton);
   return this[_singleton]
 }
}
