let namecheck=false
let numcheck=false
let mailcheck=false
let messagecheck=false


$(document).ready(function(){
    $("#valname").keypress(function(ev){
        var keyName = ev.which;
        let inp = this.value
        let x = inp.length-1
        
        if(!(keyName!=8 && (keyName<48 || keyName>57)) || (inp[x]==" " && keyName==32)){
            ev.preventDefault();
        }
    })
    $("#valname").keyup(function(){

        var text=this.value;
        var nameRegex = /^[A-Za-z ]+$/;
        if(text.charCodeAt(0)==32){
            namecheck=false;
            $("#nameerror").text("First character should not be a space")
        }else if(!text.match(nameRegex)){
            namecheck=false;
            $("#nameerror").text("Enter valid name")
        }else if(text.length<3){
            namecheck=false;
            $("#nameerror").text("Enter name with more than 2 character")
        }else if(text.match(nameRegex)){
            namecheck=true;
            $("#nameerror").text("")
        }
    })

    $("#valphone").keypress(function(e){
        var keyCode = e.which;
        
        if(!(keyCode!=8 && !(keyCode<48 || keyCode>57)) || this.value.length==10){
            e.preventDefault();
        }
    })
    $("#valphone").keyup(function(){
        var num=this.value;
        var numRegex = /^[0-9]+$/;
        if(num.length<10){
            numcheck=false;
            $("#numerror").text("Enter 10 digits")
        }else if(num.match(numRegex) && num.length==10){
            numcheck=true;
            $("#numerror").text("")
        }
    })

    $("#valmail").keypress(function(et){
        var keyCode = et.which;
        
        if(keyCode==32){
            et.preventDefault();
        }
    })

    $("#valmail").blur(function(){
        var mail=this.value;
        var mailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!mail.match(mailRegex)){
            mailcheck=false;
            $("#mailerror").text("Invalid mail")
        }else if(mail.match(mailRegex)){
            mailcheck=true;
            $("#mailerror").text("")
        }
    })

    $("#valmessage").keyup(function(){
        var message=this.value;
        if(message.length<=10){
            messagecheck=false;
            $("#messageerror").text("Enter more than 10 characters")
        }else{
            messagecheck=true;
            $("#messageerror").text("")
        }
    })
})

$("#submit-form").submit((e)=>{
    e.preventDefault()

    if(namecheck==true && numcheck==true && mailcheck==true && messagecheck==true){
        $.ajax({
            url:"https://script.google.com/macros/s/AKfycbxGz9YUSHwppOwaoRyG18aTY94EawT8K_IxVkQkN5CMWRhpPtQP4MfOYpt0jm3j95_8/exec",
            data:$("#submit-form").serialize(),
            method:"post",
            success:function (response){
                alert("Form submitted successfully")
                window.location.reload()
                //window.location.href="https://google.com"
            },
            error:function (err){
                alert("Something Error")

            }
        })
    }else{
        $("#senderror").text("Form not filled")
    }
})