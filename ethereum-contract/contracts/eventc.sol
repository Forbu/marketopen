pragma solidity ^0.4.11;
contract eventc {
  uint public public_bar;
event Top(string yolo);

function eventc(){
  this.public_bar = 0;
}

function event_testing(string test){
  Top(test);
}
}
