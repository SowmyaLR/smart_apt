App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("ATContract.json", function(atcontract) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.ATContract = TruffleContract(atcontract);
      // Connect provider to interact with contract
      App.contracts.ATContract.setProvider(App.web3Provider);

      App.render();
    });
  },
  loadAccount : async () =>{
         window.ethereum.enable().then((account) =>{
             const defaultAccount = account[0]
             web3.eth.defaultAccount = defaultAccount
             App.account = defaultAccount
         })
      },
  render: function() {
    var atContract;
    App.loadAccount();
    // Load account data
  //  web3.eth.getCoinbase(function(err, account) {
    //  if (err === null) {
      //  App.account = account;
        $("#accountAddress").html("Your Account: " + web3.eth.defaultAccount);

      //}
    //});
    // Load contract data
    App.contracts.ATContract.deployed().then(function(instance) {
      atContract = instance;
      });

}
};
function bindEvents(){
  $('#btn-owner-block-maintenance').bind('click',function(){
    window.location.href = '/maintenance-submission.html';
  });
  $('#btn-owner-block-m-status').bind('click',function(){
    window.location.href = '/maintenance-status-page.html';
  });

  $('#btn-admin-maintenance').bind('click',function(){
    window.location.href = '/maintenance-submission.html';
  });

  $('#btn-admin-maintenance-submission').bind('click',function(){
    window.location.href = '/maintenance-status-page.html';
  });

  $('#btn-admin-approve-maintenance').bind('click',function(){
    window.location.href = '/maintenance-approval-page.html';
  });

  $('#btn-admin-register-expense').bind('click',function(){
    window.location.href = '/expense-register.html';
  });
}



$(function() {
  $(window).load(function() {
    App.init();
  });
  bindEvents();
});
