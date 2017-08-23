pragma solidity ^0.4.11;
contract eventc {

event Top(string yolo);

function event_testing(string test){
  Top(test);
}
}
