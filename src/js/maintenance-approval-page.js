function MaintenanceApprovalPage() {
    var demoValue = 'test';
    var self = this;

    MaintenanceApprovalPage.prototype.addingTrasactionContent = function (dataList, dataCount) {
        var mainContainerClone = $('#main-container');
        for (var iterator = 0; iterator < dataCount; iterator++) {
            var cloningContentDiv = $('#content').clone();
            var checkBoxElements;
            cloningContentDiv[0].setAttribute('id', ('content' + '_' + iterator));
            cloningContentDiv[0].className = "row content-division";
            checkBoxElements = cloningContentDiv.find(".input");
            $.each(checkBoxElements, function (index) {
                switch (checkBoxElements[index].getAttribute('content')) {
                    case 'house-id':
                        //checkBoxElements[index]['innerHTML'] = dataList[iterator]['house-id'];
                        //checkBoxElements[index]['innerHTML'] = 'test';
                        break;
                    case 'name':
                        //checkBoxElements[index]['innerHTML'] = dataList[iterator]['name'];
                        //checkBoxElements[index]['innerHTML'] = 'test';
                        break;
                    case 'account-number':
                        //checkBoxElements[index]['innerHTML'] = dataList[iterator]['account-number'];
                        //checkBoxElements[index]['innerHTML'] = 'test';
                        break;
                    case 'transaction-id':
                        //checkBoxElements[index]['innerHTML'] = dataList[iterator]['transaction-id'];
                        //checkBoxElements[index]['innerHTML'] = 'test';
                        break;
                    case 'amount-send':
                        //checkBoxElements[index]['innerHTML'] = dataList[iterator]['amount-send'];
                        //checkBoxElements[index]['innerHTML'] = 'test';
                        break;
                    case 'approve':
                        //checkBoxElements[index].setAttribute('indexValue', iterator);
                        break;
                    case 'decline':
                        //checkBoxElements[index].setAttribute('indexValue', iterator);
                        break;
                    default:
                        break;
                }
            });
            cloningContentDiv.find("input[type=checkbox]");
            mainContainerClone.append(cloningContentDiv);
            this.initializeEvents();
        }
    }

    MaintenanceApprovalPage.prototype.init = function () {
        this.initializeEvents();
        self.addingTrasactionContent(undefined, 1);
        //cloningContentDiv.find("input[type='checkbox']")

    };

    MaintenanceApprovalPage.prototype.initializeEvents = function () {

        $("input[type='checkbox']").bind('click', function (event) {
            var indexValue = event['currentTarget']['attributes']['indexvalue'];
            var checkBoxType = event['currentTarget']['attributes']['content'];
            var otherCheckBox = undefined;
            if (checkBoxType.value === 'approve') {
                otherCheckBox = $('#content_' + indexValue.value).find("input[content='decline']")[0];
                if (otherCheckBox !== undefined && otherCheckBox.checked === false) {
                    event['currentTarget'].checked = true;
                } else if (otherCheckBox !== undefined) {
                    otherCheckBox.checked = false;
                    event['currentTarget'].checked = true;
                } else {
                    event.preventDefault();
                }
            } else {
                otherCheckBox = $('#content_' + indexValue.value).find("input[content='approve']")[0];
                if (otherCheckBox !== undefined && otherCheckBox.checked === false) {
                    event['currentTarget'].checked = true;
                } else if (otherCheckBox !== undefined) {
                    otherCheckBox.checked = false;
                    event['currentTarget'].checked = true;
                } else {
                    event.preventDefault();
                }
            }
        });

        $('#btn-load-all').bind('click',function(event){
            getApprovalData();
        });
        async function getApprovalData(){
            //if(App.contracts.ATContract.isDeployed()){
              //  App.contracts.ATContract.at(App.contracts.ATContract.address);
            //}else{
                App.contracts.ATContract.deployed().then(function(instance){
                    instance.getApprovalData();
                });
            //}
        }

        $('#btn-decline-all').bind('click',function(event){
            var declineAll = $("input[content='approve']");
            $.each(declineAll, function(index){
                declineAll[index].checked = false;
            });
            
            var approveAll = $("input[content='decline']");
            $.each(approveAll, function(index){
                approveAll[index].checked = true;
            });

        });

        $('#btn-approve-all').bind('click',function(event){
            var declineAll = $("input[content='decline']");
            $.each(declineAll, function(index){
                declineAll[index].checked = false;
            });
            
            var approveAll = $("input[content='approve']");
            $.each(approveAll, function(index){
                approveAll[index].checked = true;
            });

        });
    };

        $('#btn-submit-all').bind('click',function(event){
            var deferred = $.Deferred();
            var transactionIdList = [];
            $.Deferred().resolve().then(function(){
                return self.getSubmittedData();
                //call your save method
                //return deferred.resolve();
            }).then(function(result){
                transactionIdList = result;
                console.log(transactionIdList);
                return deferred.resolve();
            }).fail(function(){
                return deferred.reject();
            });
            return deferred.promise();
        });
    

        MaintenanceApprovalPage.prototype.getSubmittedData = function(){
            var transactionList = [];
            var approvedFrame = $("input[content='approve']");
            var deferred = $.Deferred();
            $.Deferred().resolve().then(function(){
                $.each(approvedFrame, function(index){
                    if(approvedFrame[index].checked){
                        transactionList.push($(".input[content='transaction-id']")[index].innerHTML);
                    }
                });
            }).then(function(){
                return deferred.resolve(transactionList);
            }).fail(function(){
                return deferred.reject();
            });
            return deferred.promise();
    }
}

$(function () {
    var maintenanceApprovalPage = new MaintenanceApprovalPage();
    maintenanceApprovalPage.init();
});