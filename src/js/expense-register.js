$(function() {
  $(window).load(function() {
    bindEvents();
  });
  function bindEvents(){
    $('#btn-maintenance-submission').bind('click',function(){
      submitMaintenance();
    });
  }
  function submitMaintenance(){
    App.contracts.ATContract.deployed().then(function(instance){
      var transactId = parseInt($('#transaction-id-verify-input').val());
      var date = $('#submission-date-input').val().split('-')
      if($('#transaction-category-holder-input').val()=='0'){
        instance.registerAdminExpense($('#expense-amount-input').val(),0,0,0,date[1],date[0],transactId,
        {from: App.account} );
      }else if($('#transaction-category-holder-input').val()=='1'){
        instance.registerAdminExpense(0,$('#expense-amount-input').val(),0,0,date[1],date[0],transactId,
        {from: App.account} );
      }else if($('#transaction-category-holder-input').val()=='2'){
        instance.registerAdminExpense(0,0,$('#expense-amount-input').val(),0,date[1],date[0],transactId,
        {from: App.account} );
      }else{
        instance.registerAdminExpense(0,0,0,$('#expense-amount-input').val(),date[1],date[0],transactId,
        {from: App.account} );
      }

    }).then(function(err,res){
      console.log(err)
      console.log(res)
    })
  }

});
