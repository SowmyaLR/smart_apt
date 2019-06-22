
function MaintenanceReportGenerator(tokenValue) {
    console.log(tokenValue);
    this.initializeEvents();
};

MaintenanceReportGenerator.prototype.initializeEvents = function(){
    var self = this;
    $("#btn-report-generate").bind("click",function(){
        alert("Given paragraph was clicked."); 
        self.downloadPDF();
    });
};

MaintenanceReportGenerator.prototype.downloadPDF = function(){
    var js =  new jsPDF();
    js.fromHTML($('#PDFcontent').html());
    js.save('value.pdf');
};


$(function () {
    var appFunction = new MaintenanceReportGenerator('token');
});
