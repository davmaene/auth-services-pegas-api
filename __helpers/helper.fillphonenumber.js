const fillphone = ({ phone }) => {
    
    switch (phone.charAt(0)) {
        case 0: return String(phone);
        case '0': return String(phone);
        case '+': return String(`0${phone.substring(4)}`);
        case 2: return String(`0${phone.substring(3)}`);
        default: return String(`0${phone}`);
    }
}

module.exports = {
    fillphone
}