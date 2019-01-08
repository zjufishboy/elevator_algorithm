$(document).ready(function(){
    $("#moveUp").click(function(){
    console.info("电梯上行");
     $("#elevator1").animate({marginTop:'-=50px'},1000,function(){

         displayfloornow+=1;document.getElementById("floorNum1").innerHTML=displayfloornow;;

         })
    });
    $("#moveDown").click(function(){
    console.info("电梯下行");
     $("#elevator1").animate({marginTop:'+=50px'},1000,function(){
        
         displayfloornow-=1;document.getElementById("floorNum1").innerHTML=displayfloornow;;
         })
    });
    $("#start_data").click(function(){persons=parseInt($("#testpersons").val());randoms();});
    $("#start_show").click(function(){deal();});
    $("#restart").click(function(){initialfunction();});
    
});