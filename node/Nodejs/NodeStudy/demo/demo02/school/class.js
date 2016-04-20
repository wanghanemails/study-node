/**
 * Created by wanghan1 on 2016/4/19.
 */

var student = require('./student');
var teacher = require('./teacher');

//teacher.add("调用teacher模块方法")
function add(teacherName,students){
    teacher.add(teacherName)

    students.forEach(function(item,index){
        student.add(item)

    });
}
function klassName(className){
    console.log("凤凰网"+className)
}
exports.add = add
exports.klassName = klassName