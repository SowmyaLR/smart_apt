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
      }else{
        console.log('Status pending')
      }
    }).then(function(err,res){
      console.log(err)
      console.log(res)
    })
  }

});
