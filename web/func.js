/*这里是进入界面时初始化的部分*/
{
    var secs=0;/*时间记录，保留到小数点后两位*/
    var floornow=1;/*当前楼层*/
    var displayfloornow=1;/*当前楼层*/
    var target=1;/*目标楼层*/
    var busy=[0,0];/*是否在工作*/
    var persons=0;/*人数*/
    var froms=[];/*来自楼层*/
    var tos=[];/*目的楼层*/
    var appears=[];/*出现时间*/
    timedCount();
    /* elevatormove(1,6); *//*样例：先爬到6楼*/
    /* elevatormove(1,1); *//*再爬到2楼*/ 
    console.log("工作测试正常，可以开始工作");  
}
/*这里是初始化函数*/
function initialfunction(){
    let elevator1=document.getElementById("elevator1");
    let elevator2=document.getElementById("elevator2");
    elevator1.style.marginTop="250px";
    elevator2.style.marginTop="250px";
    elevator1.innerHTML='<span class="im" id="floorNum1">1</span>/<span class="im" id="target1">none</span>';
    elevator2.innerHTML='<span class="im" id="floorNum2">1</span>/<span class="im" id="target2">none</span>';
    secs=0;/*时间记录，保留到小数点后两位*/
    floornow=1;/*当前楼层*/
    displayfloornow=1;/*当前楼层*/
    target=1;/*目标楼层*/
    busy=[0,0];/*是否在工作*/
    persons=0;/*人数*/
    froms=[];/*来自楼层*/
    tos=[];/*目的楼层*/
    appears=[];/*出现时间*/
    console.log("工作测试正常，可以开始工作");
}
/*这里是移动电梯的函数*/
function elevatormove(number/*电梯编号*/,floor/*要去的楼层号*/){
    let delt=floor-floornow;
    floornow=floor/*实际楼层号用diaplayfloornow表示，这里的floornow表示运动后停止的楼层*/
    document.getElementById("target1").innerHTML=floornow;
    busy[0]=1;
    if(delt>0){
        for(let i =0;i<delt;i++){
            $(document).ready(function(){$("#moveUp").click();}); 
        }
    }
    else if(delt<0){
        for(let i =0;i>delt;i--){
            $(document).ready(function(){$("#moveDown").click();}); 
        }
    } 
    console.warn("到达目的地，当前楼层"+floornow);
}
/*这是更新时间的函数*/
function timedCount(){
    document.getElementById('time').innerHTML=secs;
    secs+=1;
    t=setTimeout("timedCount()",1000);
}
/*生成随机数列*/
function randoms(){
    froms=randomss(persons,1,6);
    tos=randomss(persons,1,6);
    appears=randomss(persons,1,60);
    selectionSort(appears,froms,tos);
    show_the_data();
}
function randomss(number,min,max){/*生成不重复数组*/
    let data=[];
    if(number>max-min+1){
        console.error("数组过大无法生成"+"["+min+","+max+"]内长度为"+number+"的不重复数组");
    }
    else{
        for(let i=0;i<number;i++){
            let f=Math.floor((Math.random()*(max-min))+min);
            for(let j=0;j<data.length;j++){
                if(data[j]==f)f=Math.floor((Math.random()*(max-min))+min);
                else
                    break;
            }
            data.push(f);
        }
    }
    return data;
}
function selectionSort(arr1,arr2,arr3) {
　　let len = arr1.length;
　　let minIndex, temp;
　　for (let i = 0; i < len - 1; i++) {
　　　　minIndex = i;
　　　　for (let j = i + 1; j < len; j++) {
　　　　　　if (arr1[j] < arr1[minIndex]) { //寻找最小的数
　　　　　　　　minIndex = j; //将最小数的索引保存
　　　　　　}
　　　　}
　　　　temp = arr1[i];
　　　　arr1[i] = arr1[minIndex];
　　　　arr1[minIndex] = temp;
       temp = arr2[i];
　　　　arr2[i] = arr2[minIndex];
　　　　arr2[minIndex] = temp;
       temp = arr3[i];
　　　　arr3[i] = arr3[minIndex];
　　　　arr3[minIndex] = temp;
　　}
　　console.log('排序结束');
　　console.log(arr1);
　　console.log(arr2);
　　console.log(arr3);
}


/*处理函数*/
function deal(){
    secs=1;
    switch(document.getElementById("MODE").value){
        case "fcfs" :   elevatorstragegy_fifs();break;
        case "fcfss":   elevatorstragegy_fifs();console.error("！空闲！回到1楼");elevatormove(1,1);break;
        case "sstf" :   shortestSeek();break;
        default:return;
    }
}
/*fcfs策略*/
function elevatorstragegy_fifs(){
    let wait =0;
    let lastto=1;
    let lastRunTime=0;
    let waits="";
    for(let i=0;i<persons;i++){
        wait+=Math.abs(froms[i]-lastto)+lastRunTime;
        lastto=tos[i];
        lastRunTime=Math.abs(froms[i]-tos[i]);
        console.log(""+lastto+" "+wait);
        elevatormove(1,froms[i]);
        elevatormove(1,tos[i]); 
        
        waits+=wait+" "
    }
    document.getElementById("outcome").innerHTML=waits;
} 
/*找到最近楼层*/
function shortestSeek(){
    let array=[0,0,0,0,0,0];
    let records=[];
    let now=1;
    let site=0;
    let slength=6;




    let wait =0;
    let lastto=1;
    let lastRunTime=0;
    let waits="";





    /*找到最近的*/
    for(let j=0;j<persons;j++){
        slength=6;
        for(let i=0;i<persons;i++){
            if(array[i]!=-1&&Math.abs(froms[i]-now)<slength){
                slength= Math.abs(froms[i]-now);
                site=i;
            }
        }
        records.push(froms[site]);
        records.push(tos[site]);
        now=tos[site];
        array[site]=-1;
    }
    console.log("array:"+array);
    for(let i=0;i<persons;i++){
        wait+=Math.abs(records[2*i]-lastto)+lastRunTime;
        lastto=records[2*i+1];
        lastRunTime=Math.abs(records[2*i]-records[2*i+1]);
        elevatormove(1,records[2*i]); 
        elevatormove(1,records[2*i+1]); 
        waits+=wait+" "
    }
    document.getElementById("outcome").innerHTML=waits;
}






/*展示函数*/
function show_the_data(){
    switch(document.getElementById("MODE").value){
        case "fcfs":show_the_data_fcfs();break;
        case "fcfss":show_the_data_fcfs();break;
        default:return;
    }
}
/*展示fcfs的数据模式*/
function show_the_data_fcfs(){
    let x="DATA SET:";
    let i=0;
    for( i = 0;i<persons-1;i++){
        x+=froms[i]+"=>"+tos[i]+"|"
    }
    x+=froms[i]+"=>"+tos[i];
    $(document).ready(function(){$("#testinfo").text(x);}); 
}