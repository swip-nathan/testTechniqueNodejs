//exported function
module.exports = {
    verifPass: pass => {
        if (pass.length < 5){
            return true;
        }
    },

    validMail: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    
}