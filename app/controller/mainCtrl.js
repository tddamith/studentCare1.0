/**
 * Created by **** on 10/22/2016.
 */

stuCareApp.controller('mainCtrl', function ($scope, studentServices, attendanceServices,
                                            notificationService, loginService,adverServices) {

    (loginService.getUserName()) ?  $scope.userName =loginService.getUserName() : $state.go('login')
    //#STUDENT FUNCTION
    $scope.student = function () {
        return {
            openMode: function () {
                $('#studentModel').removeClass('display-none');
            },
            closeMode: function () {
                $('#studentModel').addClass('display-none');
            },
            saveMode: function (ev) {
                if (checkbirthday(ev)) {
                    $scope.student.birthday = $scope.student.bYear + '-' + $scope.student.bMonth + '-' + $scope.student.bDay;
                    studentServices.newStudent($scope.student).then(function (response) {
                        var data = response.data;
                        if (data.status) {
                            notificationService.success('successfully added new student');
                            $scope.student.closeMode();
                        } else {
                            notificationService.error(data.message);
                        }
                    }, function (response) {
                        notificationService.error('network error occured. please try again later !!!')
                    })
                }
            }
        }
    }();

    var checkbirthday = function (ev) {
        if (!$scope.student.bYear) {
            notificationService.error("please select birthday year");
            return false;
        } else if (!$scope.student.bMonth) {
            notificationService.error("please select birthday month");
            return false;
        } else if (!$scope.student.bDay) {
            notificationService.error("please select birthday day");
            return false;
        } else
            return true;
    };

    //#ADVERTISEMENT FUNCTION
    $scope.advert = {};
    var getCurrent = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (month.toString().length == 1) {
            var month = '0' + month;
        }
        if (day.toString().length == 1) {
            var day = '0' + day;
        }
        if (hour.toString().length == 1) {
            var hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            var minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            var second = '0' + second;
        }

        return {
            time: function () {
                return hour + ':' + minute + ':' + second;
            },
            date: function () {
                return year + '/' + month + '/' + day
            }
        }
    }();

    $scope.advert.date = getCurrent.date();
    $scope.advert.time = getCurrent.time();
    $scope.advertisement = function () {
        return {
            openMode: function () {
                $('#advertisementModel').removeClass('display-none');
            },
            closeMode: function () {
                $('#advertisementModel').addClass('display-none');
            },
            changeYear: function (year) {
                $scope.subjectObj = [];
                if (year != "") {
                    studentServices.GetSubjectId(year).then(function (res) {
                        if (res.data.data) {
                            $scope.subjectObj = res.data.data;
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }
            },
            savePost : function(){  
                if ($scope.advert.subject && typeof $scope.advert.subject !== 'object') {
                    var jsonSub = JSON.parse($scope.advert.subject) 
                    $scope.advert.subjectID = jsonSub.id;
                    $scope.advert.subjectName = jsonSub.name;
                }

                $scope.advert.adminID = loginService.getUserName()
                // delete $scope.advert.subject;

                adverServices.addPost($scope.advert).then(function (res) {
                    var data = res.data
                    if (data.status) {
                        notificationService.success('successfully added new advertisement');
                        $scope.advertisement.closeMode();
                    } else {
                        notificationService.error(data.message);
                    }
                }, function (error) {
                    console.log(error);
                });
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
            },
            saveAttendance : function(){ 
                $scope.attendanceObj.studentID = $scope.studentAtt.id;
                $scope.attendanceObj.startTime = $scope.attendanceObj.time
                if ($scope.attendanceObj.check === 'IN') {
                    attendanceServices.saveAttendance($scope.attendanceObj).then(function (res) {
                        var data = res.data
                        if (data.status) {
                            notificationService.success('successfully added new attendance');
                            $scope.attendance.closeMode();
                        } else {
                            notificationService.error(data.message);
                        }
                    }, function (err) {
                        console.log(err);
                    });                    
                }else{
                    notificationService.error('please select check in to add new record', 'top_left');
                }
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