/**
 * Created by **** on 10/22/2016.
 */

stuCareApp.controller('mainCtrl', function ($scope, studentServices, attendanceServices,loginService
                                            notificationService) {

    $scope.userName = loginService.getUserName()

    //#STUDENT FUNCTION
 
    $scope.student = function () {
        return {
            openMode: function () { 
                $('#studentModel').removeClass('display-none'); 
                setBirthday();
            },  
            closeMode: function () {
                $('#studentModel').addClass('display-none'); 
            },
            saveMode: function(){
                $scope.student.birthday = $scope.bYear + '-' + $scope.bMonth + '-' + $scope.bDay;
                studentServices.newStudent($scope.student).then(function(response){
                    var data = response.data;
                    if (data.status) {
                        notificationService.success('successfully added new student');
                        $scope.student.closeMode();
                    }else{
                        notificationService.error(data.message);
                    }
                },function(response){
                    notificationService.error('network error occured. please try again later !!!')
                })
            }
        }
    }();

    var setBirthday = function(){
        $scope.bYear = '1993'
        $scope.bMonth = '1'
        $scope.bDay = '1'
    }

    //#ADVERTISEMENT FUNCTION
    $scope.advertisement = function () {
        return {
            openMode: function () {
                $('#advertisementModel').removeClass('display-none');
            },
            closeMode: function () {
                $('#advertisementModel').addClass('display-none');
            }
        }
    }();

    //#ATTENDANCE FUNCTION
    $scope.studentAtt = {};
    $scope.Lectures = {};
    $scope.attendanceObj = {};
    $scope.lectureHasSubjectObj = {};
    $scope.lectureName = null;
    $scope.attendanceObj.date = getCurrent.date();
    $scope.attendanceObj.time = getCurrent.time();
    $scope.attendance = function () {
        return {
            openMode: function () {
                $('#attendanceModel').removeClass('display-none');
            },
            closeMode: function () {
                $('#attendanceModel').addClass('display-none');
            },
            getCurrentUser: function (studentId) {
                if (studentId) {
                    studentServices.GetStudentRecord(studentId).then(function (res) {
                        if (res.data.data) {
                            $scope.studentAtt.found = true;
                            $scope.studentAtt.data = res.data.data[0];
                        } else {
                            notificationService.error('student not found..Please try again', 'top_left');
                        }
                    }, function (err) {
                        notificationService.error('student not found..Please try again', 'top_left');
                    });
                }
            },
            getAllLecture: function () {
                attendanceServices.GetAllLecture().then(function (res) {
                    if (res.data.data) {
                        $scope.Lectures = res.data.data;
                    }
                }, function (err) {

                });
            },
            getLectureHasSubject: function (name) {
                console.log($scope.lectureName);
                attendanceServices.GetLectureHasSubject(name).then(function (res) {
                    if (res.data.data) {
                        $scope.lectureHasSubjectObj = res.data.data;
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        }

    }();
    $scope.attendance.getAllLecture();


}).directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});