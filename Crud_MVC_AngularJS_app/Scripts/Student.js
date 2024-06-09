var app = angular.module("myApp", []);
app.controller("myCntrl", function ($scope,$http) {
    $scope.GetAllStudent = function () {
        $http({
            method: "get",
            url: "https://localhost:44321/Home/GetAllStudent"
        }).then(function (response) {
            debugger;
            $scope.student = response.data;
        }, function () {
            debugger;
            alert("Error Occur!");


        })
    };
    $scope.InsertStudent = function () {
        var type = document.getElementById("insertStd").getAttribute("value");
        if (type == "Submit") {
            $scope.student = {};
            $scope.student.Name = $scope.SName;
            $scope.student.Age = $scope.SAge;
            $scope.student.Department = $scope.SDepartment;
            $http({
                method: "post",
                url: "https://localhost:44321/Home/InsertStudentRecord",
                datatype: "json",
                data: $scope.student
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllStudent();
                $scope.SName = "";
                $scope.SAge = "";
                $scope.SDepartment = "";
            })

        }
        else {
            $scope.student = {};
            $scope.student.id = sessionStorage.getItem("SID");
            $scope.student.Name = $scope.SName;
            $scope.student.Age = $scope.SAge;
            $scope.student.Department = $scope.SDepartment;
            $http({
                method: "post",
                url: "http://localhost:44321/Home/UpdateStudentRecord",
                datatype: "json"
                data: JSON.stringify($scope.student)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllStudent();
                $scope.SName = "";
                $scope.SAge = "";
                $scope.SDepartment = "";
                document.getElementById("insertStd").getAttribute("value", "Submit");
            })

        }
    };

    $scope.UpdateStudent = function (Std) {
        debugger;
        sessionStorage.setItem("SID", Std.Id);
           $scope.SName = $scope.Name,
            $scope.SAge = $scope.Age,
            $scope.SDepartment = $scope.Department,
            document.getElementById("insertStd").getAttribute("value", "Submit");
    };
    $scope.DeleteStudent = function (Std) {
        $http({
            method: "post",
            url: "https://localhost:44321/Home/DeleteStudent",
            datatype: "json"
             data: JSON.stringify(Std)

        }).then(function (response) {
            alert(response.data);
            //alert("deleted successfully!");
            $scope.GetAllStudent();

        })
    }
});