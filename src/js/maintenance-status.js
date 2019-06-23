$(function() {
  $(window).load(function() {
    bindEvents();
  });
  function bindEvents(){
    $('#btn-maintenance-submission').bind('click',function(){
      getMaintenanceStatus();
    });
  }
  function getMaintenanceStatus(){
    App.contracts.ATContract.deployed().then(function(instance){
    //  var transactId = parseInt($('#transaction-id-verify-input').val());
      //instance.getMaintenanceStatus(transactId,{from: App.account} );
      var transactId = parseInt($('#transaction-id-verify-input').val());
      if(instance.summaryData(transactId)==1){
        console.log('Approved')
        $('#alert-label')[0]['className'] = "alert alert-success ";
        $('#alert-label')[0]['innerHTML'] = "Approved";
      }else{
        $('#alert-label')[0]['className'] = "alert alert-warning ";
        $('#alert-label')[0]['innerHTML'] = "Pending";
      }
    }).then(function(err,res){
      console.log(err)
      console.log(res)
    })
  }

});
