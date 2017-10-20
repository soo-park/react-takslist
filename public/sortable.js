$(function() {
  var sorted = $( "#sortable" ).sortable({
    update: function(event, ui){
      serial = $('#sortable').sortable("serialize", { key: "itemorder" });
      // alert(serial);
    }
  });
});