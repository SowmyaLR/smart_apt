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
      instance.registerMaintenance(transactId,parseInt(date[1]),parseInt(date[0]),
      parseInt($('#maintenance-amount-input').val()),
      $('#transaction-account-holder-input').val(),
      $('#transaction-account-number-input').val(),{from: App.account} );
    }).then(function(err,res){
      console.log(err)
      console.log(res)
    })
  }

});
