
# launching the blockchain like provider
testrpc&

# launching the smartcontract
cd ethereum-contract
truffle deploy&

# Now we launch the express js server (to redo because the current modification)
# two thing to change :
# - Public adress for the sellers
# - Public adress of the contract
cd ../marketopenBackend
# launching express server (backend server) and mongodb
mongod&
DEBUG=myapp:* npm start

# launching the angular frontend server
cd ../marketopenAngularPage
ng serve --open
