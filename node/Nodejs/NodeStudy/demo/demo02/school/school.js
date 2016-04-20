/**
 * Created by wanghan1 on 2016/4/19.
 */

var klass = require('./class');

function schoolName(schoolName){
    console.log("我网是" +schoolName);
}

exports.add = function(klasses){
    klasses.forEach(function (item,index){
        var _klass = item;
        var teacherName = item.teacherName;
        var students = item.students;
        var klassName = item.klassName;

        klass.add(teacherName,students);
        klass.klassName(klassName);
    });
   // klass.add('春哥',['美娜','慧霞','cc','宋','吴婷',"涵"]);

}
exports.klassName=function(){
    klass.klassName(className);
}
exports.schoolName = schoolName;