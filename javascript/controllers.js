var app = angular.module("Dashboard", []);

app.controller("FirstCtrl", ($scope) => {
  $scope.items = [{
    name: 'Main Content Area',
    pdf: "pdf/ChristieCookie.pdf"
  }];

});

app.controller("SideCtrl", ($scope) => {
  $scope.name = "Sidebar";
  $scope.jobs = [];
  //$scope.master = ["test1", "test2"]
  //console.log($scope.master);
  const getList = function() {
    /* set up XMLHttpRequest to Parse EXCEL spreadsheet */
    var url = "db/list/PROJECTLIST master.xls.xlsx";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
      var arraybuffer = oReq.response;

      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");

      /* Call XLSX */
      var workbook = XLSX.read(bstr, {
        type: "binary"
      });

      /* DO SOMETHING WITH workbook HERE */
      let jobs = workbook.Sheets["Master Project List"];
      //console.log(workbook,jobs);

      var sheet2arr = function(sheet) {
        var result = [];
        var row;
        var rowNum;
        var colNum;
        var range = XLSX.utils.decode_range(sheet['!ref']);
        for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          row = [];
          for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
            var nextCell = sheet[
              XLSX.utils.encode_cell({
                r: rowNum,
                c: colNum
              })
            ];
            if (typeof nextCell === 'undefined') {
              row.push(void 0);
            } else row.push(nextCell.w);
          }
          result.push(row);
        }
        return result;
      };

      let arrToSlice = sheet2arr(jobs);
      let newList = arrToSlice.slice(5, 700);
      let arrayList = [];
      let jobObj = {};

      newList.forEach(function(job) {
        jobObj.name = job[0];
        jobObj.code = job[1];
        jobObj.number = job[2];
        jobObj.phase = job[3];
        arrayList.push(jobObj);
        arrayList.reverse();
      });

      $scope.master = arrayList;

      return $scope.master;

    }
    oReq.send();
  };

  getList();
  //console.log(getList());
//  $scope.master = getList();


});
