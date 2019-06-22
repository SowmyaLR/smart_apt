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
       instance.registerMaintenance(transactId,parseInt(date[1]),parseInt(date[2]),
      parseInt($('#maintenance-amount-input').val()), {from: App.account} );
    }).then(function(err,res){
      console.log(err)
      console.log(res)
    })
  }
  function getParam( name ){
   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regexS = "[\\?&]"+name+"=([^&#]*)";
   var regex = new RegExp( regexS );
   var results = regex.exec( window.location.href );
   if( results == null )
    return "";
  else
   return results[1];
  }
});
