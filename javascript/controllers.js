var app = angular.module("Dashboard", ['angular-js-xlsx']);

app.controller("FirstCtrl", ($scope) => {
  $scope.items = [{
    name: 'Main Content Area',
    pdf: "pdf/ChristieCookie.pdf"
  }];

});

app.controller("SideCtrl", ($http, $q, $scope) => {
  $scope.name = "Sidebar";
  $scope.jobs = [];
  $scope.master = [];

  //console.log($scope.name);

  // const load = () => {
  //   return new $q((resolve, reject) => {
  //     $http({
  //         method: 'GET',
  //         url: 'db/list/PROJECTLIST master.xls.xlsx',
  //         responseType: "arraybuffer",
  //       })
  //       .then((response) => {
  //
  //         var arraybuffer = response;
  //
  //         /* convert data to binary string */
  //         var data = new Uint8Array(arraybuffer);
  //         var arr = new Array();
  //         for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  //         var bstr = arr.join("");
  //
  //         /* Call XLSX */
  //         var workbook = XLSX.read(bstr, {
  //           type: "binary"
  //         });
  //
  //         console.log("test", workbook);
  //
  //         /* DO SOMETHING WITH workbook HERE */
  //         let myArray = workbook.Sheets["Master Project List"];
  //         console.log(myArray);
  //
  //
  //
  //         resolve(myArray);
  //       }).catch((error) => {
  //         reject(error);
  //       });
  //   });
  // }
  //
  // load();

// ---------------------------------------------------------

  // const yay = () => {
  //   return new $q((resolve, reject) => {
  //     var url = 'db/list/PROJECTLIST master.xls.xlsx';
  //     var oReq = new XMLHttpRequest();
  //     var workbook;
  //     oReq.open("GET", url, true);
  //     oReq.responseType = "arraybuffer";
  //     oReq.onload = (e) => {
  //       if (oReq.status >= 200 && oReq.status < 300) {
  //         var arraybuffer = oReq.response;
  //         var data = new Uint8Array(arraybuffer);
  //         var arr = new Array();
  //         for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  //         var bstr = arr.join("");
  //         workbook = XLSX.read(bstr, {
  //           type: "binary"
  //         });
  //
  //         //console.log(workbook);
  //         var worksheetname = workbook.SheetNames[0];
  //         var worksheet = workbook.Sheets[worksheetname];
  //         var json = XLSX.utils.sheet_to_json(worksheet, {
  //           raw: true
  //         });
  //         resolve(workbook);
  //       } else {
  //         reject(console.log('XMLHttpRequest failed; error code:' + oReq.statusText));
  //       }
  //     }
  //     oReq.send();
  //   });
  //
  // };
  //
  // $scope.master = yay().then((response) => {
  //
  //   //console.log(response);
  //   let jobs = response.Sheets["Master Project List"];
  //
  //   var sheet2arr = function(sheet) {
  //     var result = [];
  //     var row;
  //     var rowNum;
  //     var colNum;
  //     var range = XLSX.utils.decode_range(sheet['!ref']);
  //     for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  //       row = [];
  //       for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
  //         var nextCell = sheet[
  //           XLSX.utils.encode_cell({
  //             r: rowNum,
  //             c: colNum
  //           })
  //         ];
  //         if (typeof nextCell === 'undefined') {
  //           row.push(void 0);
  //         } else row.push(nextCell.w);
  //       }
  //       result.push(row);
  //     }
  //     return result;
  //   };
  //
  //   let arrToSlice = sheet2arr(jobs);
  //   let newList = arrToSlice.slice(5, 700);
  //   let arrayList = [];
  //   let jobObj = {};
  //
  //   newList.forEach(function(job) {
  //     jobObj.name = job[0];
  //     jobObj.code = job[1];
  //     jobObj.number = job[2];
  //     jobObj.phase = job[3];
  //     arrayList.push(jobObj);
  //     arrayList.reverse();
  //   });
  //
  //   //console.log(arrayList);
  //   return arrayList;
  //
  // }).catch((error) => {
  //   console.log("errorz", error);
  // });
  //
  // console.log($scope.master.$$state);


  const returnMaster = (array) => {
    //console.log(array);
    let list = array;
    
    $scope.$apply(() => {
      $scope.master = list;  
    });
  };
  // -------------------------------------
  const getList = function() {
    /* set up XMLHttpRequest to Parse EXCEL spreadsheet */
    var url = "db/PROJECTLIST master.xls.xlsx";
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

      //console.log(workbook);
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


      newList.forEach(function(job) {
        let jobObj = {};
        jobObj.name = job[0];
        jobObj.code = job[1];
        jobObj.number = job[2];
        jobObj.phase = job[3];
        arrayList.push(jobObj);
      });

        arrayList.reverse();
        console.log(arrayList);

      //console.log(arrayList);

      // $scope.$apply(function(arrayList) {
      //       $scope.master = arrayList;
      //       console.log("test", $scope);
      //   });

      //$scope.master = arrayList;
      returnMaster(arrayList);
    }
    oReq.send();
    //console.log(arrayList);
  };
  getList();

});
