const sendMessage=document.querySelector(".sendMessage");
/**
 * @type {HTMLInputElement}
 */
const theMessage=document.querySelector(".message");


sendMessage.addEventListener("click",(event)=>{

    fetch("/dashboard/createNewMessage",{
        method:'post',
        headers:{
            "Content-Type":"application/json"
        },
        body:{newMessage:JSON.stringify(theMessage.value)},
    })
})