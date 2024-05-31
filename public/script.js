const socket=io();
const chatbtn =document.getElementById('chat-btn')
const chatList=document.getElementById('chat-list')
const chatInp=document.getElementById('chat-inp')
const loginBtn=document.getElementById('login-btn')
const loginInp =document.getElementById('login-inp')
const chatSection=document.getElementById('chat-section')
const loginSection=document.getElementById('login-section')




chatSection.classList.add('class','d-none')


chatbtn.addEventListener('click',()=>{
     const msg=chatInp.value;
     chatInp.value="";
     if(msg==""){
        alert("Enter msg!!");
        return;
     }
     else{
        socket.emit('send-msg',{msg})
     }
})

socket.on('received-msg',(data)=>{
    const {msg,username}=data;
    const li=document.createElement('li');
    li.innerText=username+":   " +msg;
    li.setAttribute('class','border rounded-pill w-100 mb-2 p-2  text-wrap');
    console.log(li)
   chatList.append(li);
})

loginBtn.addEventListener('click',()=>{
    const msg=loginInp.value;
    loginInp.value="";
    if(msg==""){
       alert("Enter msg!!");
       return;
    }else{
        socket.emit('login',{username:msg})
        loginSection.classList.add('d-none')
        chatSection.classList.remove('d-none')
    }
})
