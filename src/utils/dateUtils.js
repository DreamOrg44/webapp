// utils/dateUtils.js
function getCurrentDate() {
    // const currentDate = new Date();
    const estString = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    console.log("My current date is ", estString);
    return estString;

}


module.exports = {
    getCurrentDate,
};
