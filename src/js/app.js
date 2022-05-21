App = {
  loading: false,
  contracts: {},  
  load: async () => {

    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    //var Web3 = require('web3')  ;  
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {

      //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        App.acc=await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = App.acc[0];  
    //window.alert(App.account);
   
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const Office = await $.getJSON('Office.json')
    App.contracts.Office = TruffleContract(Office)
    App.contracts.Office.setProvider(App.web3Provider)
    // Hydrate the smart contract with values from the blockchain
    App.office = await App.contracts.Office.deployed();
  },
  register :async()=>{

    var role=$("#selectrole").val(); 
    var uname=$("#uname").val();
    var uemail=$("#uemail").val();
    var uphno=$("#uphno").val();
    var usalary=$("#usalary").val();
    await App.office.addUser(uname,uemail,uphno,role,usalary,{from:App.account});
    await App.render();

  },
  render: async () => { 

    
    var role= await App.office.roles(App.account);
    //window.alert(role);

    var admin=await App.office.admin();
    
    if(admin.toString().toUpperCase()==App.account.toString().toUpperCase()){

        window.alert("Welcome Admin. Your a/c is : "+admin);
 
        var totalUsers=await App.office.totalUsers();
        var count=parseInt(totalUsers);
       $("#dispUsersA").empty();
        for(var i=1;i<=count;i++){
          var user=await App.office.users(parseInt(i));
          var str="<tr><td>"+user[0]+"</td><td>"+user[1]+"</td><td>"+user[2]+"</td><td>"+user[3]+"</td><td>"+user[4]+"</td></tr>";
          $("#dispUsersA").append(str);
        }


        $("#signupPage").hide();
        $("#employeedashboard").hide();
        $("#officedashboard").hide();
        $("#adminD").show();
       
        

    }

    else if(role=="1"){

      userInfo=await App.office.getUserInfo(App.account);
      $("#dispEname").html(userInfo[0]);
      $("#dispEemail").html(userInfo[1]);
      $("#dispEphone").html(userInfo[2]);
      $("#dispEsalary").html(userInfo[4]);

      $("#signupPage").hide();
      $("#employeedashboard").show();
      $("#officedashboard").hide();
      $("#adminD").hide();

  }
  else if(role=="2"){

    window.alert("Welcome Office Staff. Your a/c is : "+admin);

    var totalUsers=await App.office.totalUsers();
        var count=parseInt(totalUsers);
       $("#dispUsersO").empty();
        for(var i=1;i<=count;i++){
          var user=await App.office.users(parseInt(i));
          var str="<tr><td>"+user[0]+"</td><td>"+user[1]+"</td><td>"+user[2]+"</td><td>"+user[3]+"</td><td><input type="+"text"+"  value="+user[4]+"></td><td>"+"<button type="+"button"+" onclick="+"App.updateSalary()"+">update</button></td></tr>";
          $("#dispUsersO").append(str);
        }


        $("#signupPage").hide();
        $("#employeedashboard").hide();
        $("#officedashboard").show();
        $("#adminD").hide();
        

  }

 
  else{

    $("#signupPage").show();
    $("#employeedashboard").hide();
    $("#officedashboard").hide();
    $("#adminD").hide();
    
    
  }
    
  }, 

  updateSalary: async () => { 

    window.alert("Work still going on...");
  }
  

}



