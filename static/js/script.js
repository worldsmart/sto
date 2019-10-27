function orderCall() {
    let name = document.getElementById('name').value;
    let phone = document.getElementById('number').value;
    const Http = new XMLHttpRequest();
    const url='/ordercall';
    Http.open("POST", url);
    Http.setRequestHeader('Content-type', 'application/json');
    Http.send(JSON.stringify({
        "name":name,
        "phone":phone
    }));

    Http.onreadystatechange = (e) => {
        if(Http.readyState == 4 && Http.status == 200) {
            let res = JSON.parse(Http.responseText);
            if(res['err']){

            }else {
                alert('Заказ получен, ожидайте звонка!');
                window.location.reload();
            }
        }
    }
}

function backToTop(){
    let button =$('.back-to-top');
/*
    $(window).on('scroll', () =>{
        if($(this).scrollTop()>=50) {
            button.fadeIn();
        } else {
            button.fadeOut();
        }
    });
*/
    button.on('click',(event)=>{
        event.preventDefault();
        $('html').animate({scrollTop:0},1000);
    })
}
backToTop();


function toComments(){
    let button=$('.to-comments');
    button.on('click',(event)=>{
        event.preventDefault();
        $('html').animate({scrollTop: $("#comments").offset().top},1000);
    }) 
}
toComments();



function openForm(){
    $("#myForm").css("display", "block");
}
function closeForm(){
    $("#myForm").css("display", "none");
}

$(document).mouseup(function (e){
   var modalctr = $("#myForm");
   var modal = $(".call-form");
   if (!modal.is(e.target) && modal.has(e.target).length === 0){
   modalctr.hide();
   }
});




function openPrice_auto_electrician(){
     if  ($("#auto_electrician").css("display") == "table"){
        $("#auto_electrician").css("display","none");       
    }
     else{
        $("#auto_electrician").css("display","table"); 
}; };  

function openPrice_engine(){
     if  ($("#engine").css("display") == "table"){
        $("#engine").css("display","none");
    }
     else{
        $("#engine").css("display","table");  
}; };  

function openPrice_air_conditioning(){
     if  ($("#air_conditioning").css("display") == "table"){
        $("#air_conditioning").css("display","none");
    }
     else{
        $("#air_conditioning").css("display","table");  
}; };  

function openPrice_car_wash(){
     if  ($("#car_wash").css("display") == "table"){
        $("#car_wash").css("display","none");
    }
     else{
        $("#car_wash").css("display","table");  
}; };  

function openPrice_wheel_alignment(){
     if  ($("#wheel_alignment").css("display") == "table"){
        $("#wheel_alignment").css("display","none");
    }
     else{
        $("#wheel_alignment").css("display","table");  
}; };  

function openPrice_steering_rack(){
     if  ($("#steering_rack").css("display") == "table"){
        $("#steering_rack").css("display","none");
    }
     else{
        $("#steering_rack").css("display","table");  
}; };  

function openPrice_oils(){
     if  ($("#oils").css("display") == "table"){
        $("#oils").css("display","none");
    }
     else{
        $("#oils").css("display","table");  
}; };  

function openPrice_brake_system(){
     if  ($("#brake_system").css("display") == "table"){
        $("#brake_system").css("display","none");
    }
     else{
        $("#brake_system").css("display","table");  
}; };  

function openPrice_chassis(){
     if  ($("#chassis").css("display") == "table"){
        $("#chassis").css("display","none");
    }
     else{
        $("#chassis").css("display","table");  
}; };  

function openPrice_tire_fitting(){
     if  ($("#tire_fitting").css("display") == "table"){
        $("#tire_fitting").css("display","none");
    }
     else{
        $("#tire_fitting").css("display","table");  
}; };  





