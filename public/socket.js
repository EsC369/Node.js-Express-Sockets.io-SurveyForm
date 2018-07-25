$(document).ready(function(){
  var socket = io();
  socket.on("updated_message", function(data){
    $("#survey_results").text("You emitted the following information to the server: " + JSON.stringify(data));
  });
  socket.on("random_number", function(data){
    $("#random_number").text("Your lucky number emitted by the server is " + data.num);
  });
  $("form").submit(function(e){
    e.preventDefault();
    socket.emit("posting_form", $(this).serializeArray());
  });
});