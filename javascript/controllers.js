var app = angular.module("Dashboard", []);

app.controller("FirstCtrl", ($scope) => {
    $scope.items = [{ name: 'Main Content Area', pdf:"pdf/ChristieCookie.pdf" }];

});

app.controller("SideCtrl", ($scope) => {
    $scope.name = "Sidebar";

    //     /* set up XMLHttpRequest */
    // var url = "test_files/formula_stress_test_ajax.xlsx";
    // var oReq = new XMLHttpRequest();
    // oReq.open("GET", url, true);
    // oReq.responseType = "arraybuffer";
    //
    // oReq.onload = function(e) {
    //   var arraybuffer = oReq.response;
    //
    //   /* convert data to binary string */
    //   var data = new Uint8Array(arraybuffer);
    //   var arr = new Array();
    //   for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    //   var bstr = arr.join("");
    //
    //   /* Call XLSX */
    //   var workbook = XLSX.read(bstr, {type:"binary"});
    //
    //   /* DO SOMETHING WITH workbook HERE */
    // }
    //
    // oReq.send();

});
