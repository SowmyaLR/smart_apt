
function MaintenanceReportGenerator(tokenValue) {
    console.log(tokenValue);
    var self = this;

    MaintenanceReportGenerator.prototype.iterateContent = function(){
        var mainDiv = $('#report-sheet');
        for(var iterator=0;iterator < 100;iterator++){
            var clonedContendts = $('#PDFcontent').clone();
            mainDiv.append(clonedContendts);
        }
        self.initializeEvents();
    };

    MaintenanceReportGenerator.prototype.initializeEvents = function () {
        $("#btn-report-generate").bind("click", function () {
            alert("Given paragraph was clicked.");
            self.downloadPDF();
        });
    };

    MaintenanceReportGenerator.prototype.downloadPDF = function () {
        var js = new jsPDF();
        js.fromHTML($('#report-sheet').html());
        js.save('value.pdf');
    };

};

$(function () {
    var appFunction = new MaintenanceReportGenerator('token');
    appFunction.iterateContent();
    
});
