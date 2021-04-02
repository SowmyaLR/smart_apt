# SMART APARTMENTS

The main problem for tenants in apartments are managing the monthly maintenance bills, rent paid etc.  Since none of the bills are digitalized it is difficult for tenants, owners, apartment admin to keep track of  their bills. As they couldn’t keep track of these records they may not be sure about how their money is  spent for apartment maintenance. The main problems are 

1. Admin may misuse the money 
2. Since there is no public ledger for these bills trust issue may arise 
3. Even tenants may not pay the bills at proper time. 
4. For working people it will be a manual process while claiming HR. They need to ask the house  owner at the year end for house rent receipt. 
5. For new tenants getting rental agreement will include paper work and some documentation  charges are included in that. 


To solve the above issues smart contracts can provide a simpler solution. The solution includes the  following modules 

1. Tenant and Owner ledger (T&O ledger) 
2. Admin and Tenant ledger (A&T ledger) 


This idea includes transparency in the transactions and helps to keep track of old records and helps to  solve the trust issue among people. 
Before delving deep into the above modules the following design has to be explained in detail manner  to form a block chain for the above modules. 
An apartment system may consist of many houses. In general block chain uses public key to maintain  records in ledgers. Each house will be owned by an individual. So pointing an individual or his house will  be treated as same here. So each house will have its own unique public key and each transaction done  by the tenants will be recorded with this public key. 


# STEPS TO RUN THE APP

1. First install node package manager - npm
2. Install truffle framework - "npm install -g truffle"
3. Install ganache - <a href="https://www.trufflesuite.com/ganache"> ganache</a>
4. Install Metamask chrome extensio - <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Metamask</a>
5. truffle migrate --reset 
6. npm run dev
