var app = angular.module("Dashboard", ['angular-js-xlsx']);

app.controller("FirstCtrl", ($scope) => {
    $scope.items = [{
        name: 'Main Content Area',
        pdf: "pdf/ChristieCookie.pdf"
    }];

    let vm = this;

    vm.test = "Controller As Test";
    console.log(vm.test);
});

app.controller("SideCtrl", ($http, $q, $scope) => {
    $scope.name = "Master List";
    $scope.jobs = [];
    $scope.master = [];

    const returnMaster = (array) => {
        let list = array;

        $scope.$apply(() => {
            $scope.master = list;
        });
    };
    // -------------------------------------
    const getList = function() {
        /* set up XMLHttpRequest to Parse EXCEL spreadsheet */
        var url = "db/PROJECTLIST master.xlsx";
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
            let newList = arrToSlice.slice(5, 715);
            let arrayList = [];

            // Turn the nested array data into objects
            newList.forEach(function(job) {
                let jobObj = {};
                jobObj.name = job[0];
                jobObj.code = job[1];
                jobObj.number = job[2];
                jobObj.phase = job[3];
                arrayList.push(jobObj);
            });

            arrayList.reverse();

            returnMaster(arrayList);
        };
        oReq.send();
    };
    getList();

});
