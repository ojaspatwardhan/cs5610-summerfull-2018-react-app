let _singleton = Symbol();
// const MODULE_API_URL = 'http://localhost:8080/api/course/CID/module';
// const MODULE_API_URL_2 = "http://localhost:8080/api/module"

const MODULE_API_URL = 'https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/course/CID/module';
const MODULE_API_URL_2 = "https://cs5610-summer-2018-pat-ojas.herokuapp.com/api/module"

export default class ModuleService {
 constructor(singletonToken) {
   if (_singleton !== singletonToken)
     throw new Error('Singleton!!!');
 }

 createModule(courseId, module) {
   return fetch(MODULE_API_URL.replace('CID', courseId),
   {
     body: JSON.stringify(module),
     headers: { 'Content-Type': 'application/json' },
     method: 'POST'
   }).then(function (response){
     return response.json();
   });
 }

 findAllModulesForCourse(courseId) {
   return fetch(
      MODULE_API_URL
         .replace('CID', courseId))
      .then(function(response) {
         return response.json();
      });
 }

 deleteModule(moduleId) {
   return fetch(MODULE_API_URL_2 + "/" + moduleId, {
     method: "DELETE"
   }).then(function (response) {
     return response;
   })
 }

 findAllModules() {
   return fetch(MODULE_API_URL_2).then(function(response) {
     return response.json();
   });
 }

 static get instance() {
   if(!this[_singleton])
     this[_singleton] = new ModuleService(_singleton);
   return this[_singleton]
 }
}
