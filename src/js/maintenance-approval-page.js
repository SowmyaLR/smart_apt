function MaintenanceApprovalPage(){
    var demoValue = 'test';
    var self = this;

    MaintenanceApprovalPage.prototype.init = function(){
        var index = 0;
        //$('#content')[0].className = "row content-division";
        var cloningContentDiv = $('#content').clone();
        var mainContainerClone = $('#main-container');
        cloningContentDiv[0].setAttribute('id',('content'+'_'+index));
        cloningContentDiv[0].className = "row content-division";
        mainContainerClone.append(cloningContentDiv);
        this.initializeEvents();
        //cloningContentDiv.find("input[type='checkbox']")
    };   

    MaintenanceApprovalPage.prototype.initializeEvents = function(){
        
        $("input[type='checkbox']").bind('click',function(event){
            var indexValue = event['currentTarget']['attributes']['indexvalue'];
            var checkBoxType = event['currentTarget']['attributes']['content'];
            var otherCheckBox = undefined;
            if(checkBoxType.value === 'approve'){
                otherCheckBox = $('#content_'+indexValue.value).find("input[content='decline']")[0];
                if(otherCheckBox !== undefined && otherCheckBox.checked === false){
                    event['currentTarget'].checked = true;
                }else if(otherCheckBox !== undefined){
                    otherCheckBox.checked = false;
                    event['currentTarget'].checked = true;
                }else{
                    event.preventDefault();
                }
            }else{
                otherCheckBox = $('#content_'+indexValue.value).find("input[content='approve']")[0];
                if(otherCheckBox !== undefined  && otherCheckBox.checked === false){
                    event['currentTarget'].checked = true;
                }else if(otherCheckBox !== undefined){
                    otherCheckBox.checked = false;
                    event['currentTarget'].checked = true;
                }else{
                    event.preventDefault();
                }
            }
        });
    };
}

$(function(){
    var maintenanceApprovalPage = new MaintenanceApprovalPage();
    maintenanceApprovalPage.init();
});