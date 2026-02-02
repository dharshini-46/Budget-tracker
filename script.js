let data=JSON.parse(localStorage.getItem("data"))||[]

function save(){
    localStorage.setItem("data",JSON.stringify(data))
}

function addTransaction(){
    let d=desc.value
    let a=Number(amount.value)
    let t=type.value
    if(d==""||a=="")return
    data.push({desc:d,amount:a,type:t})
    desc.value=""
    amount.value=""
    save()
    render()
}

function del(i){
    data.splice(i,1)
    save()
    render()
}

function render(){
    list.innerHTML=""
    let inc=0
    let exp=0
    let f=filter.value
    data.forEach((x,i)=>{
        if(f!="all"&&x.type!=f)return
        let li=document.createElement("li")
        li.className=x.type
        li.innerHTML=`${x.desc} ₹${x.amount}<button onclick="del(${i})">X</button>`
        list.appendChild(li)
        if(x.type=="income")inc+=x.amount
        else exp+=x.amount
    })
    income.innerText=inc
    expense.innerText=exp
    balance.innerText=inc-exp
    drawChart(inc,exp)
}

function drawChart(i,e){
    let c=document.getElementById("chart")
    let ctx=c.getContext("2d")
    ctx.clearRect(0,0,300,200)
    let total=i+e
    if(total==0)return
    let iAngle=(i/total)*2*Math.PI
    ctx.fillStyle="green"
    ctx.beginPath()
    ctx.moveTo(150,100)
    ctx.arc(150,100,80,0,iAngle)
    ctx.fill()
    ctx.fillStyle="red"
    ctx.beginPath()
    ctx.moveTo(150,100)
    ctx.arc(150,100,80,iAngle,2*Math.PI)
    ctx.fill()
}

render()
