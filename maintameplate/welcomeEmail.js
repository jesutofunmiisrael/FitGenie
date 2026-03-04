const transporter = require("../config/Nodemaller")

const WelcomeEmail = async (name, email) =>{
    
     transporter.sendMail({
        to:email,
        from:"jesutofunmi",
        subject:`Welcome ${name}`,
           html:`<div style=" padding: 1rem;">
        <h2>Hello, ${name}</h2>

        <p>Welcome to geni ai</p>

     
            style="background: black; width: fit-content; color: white; display: block; padding: .5rem 1rem; border-radius: 8px; border: none; text-decoration: none;"></a>
    </div>`
     }, (err, info) =>{
        if(err){
            console.log(err);
            
        }else{
            console.log(`email sent to ${email}`);
            
        }
     })

}

module.exports = WelcomeEmail