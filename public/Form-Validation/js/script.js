//When DOM is loaded initiate the requirements of hiding and selecting input values
$(function () {
    $('input')[0].focus();
    $('#other-role').hide();
    $('#color').hide();
    $('#payment option:eq(1)').prop('selected',true);
    $('#design option:eq(0)').prop('selected',true);
    showCCInfo();

});
//constructing a checklist that on each of the validation fields will turn true if user supplies correct information
let checkForm = {"name":false,
    "mail":false,
    "act":false,
    "ccnum":false,
    "zip":false,
    "cvv":false
};

//checks to see if name is blank (needs to have a value)
$('#name').on('input',function (e) {
  $('.namemsg').remove();

    let usrInput = (e.target.value);
    console.log(usrInput.length);
    console.log(usrInput);
    let whiteRegex = /[\s]/g;
    usrInput = usrInput.replace(/\s/g,"");
    if (usrInput === "") {
        $(this).css("border", "5px solid #f11");
        $(this).after("<p class='namemsg'>Enter Name!</p>");
    }
    else{
        $(this).css("border", "none");
        checkForm.name = true;
        $('.namemsg').hide();
    }
});
//check to see if email is field is empty and if it does have the @ and .com using regex throwing an error
$('#mail').on('input',function (e) {

    $('.mailmsg').remove();
    let emailInput = (e.target.value);
    let mailRegex = /[a-zA-z]*@[a-zA-z]*\.[a-z]+/g;
    let mailRegex2 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailInput === "") {
        $(this).css("border", "5px solid #f11");
        $(this).after("<p class='mailmsg'>Enter an email!</p>");
    }
    else if (!mailRegex2.test(emailInput)){
        $(this).css("border", "5px solid #f11");
        $(this).after("<p class='mailmsg'>Enter a valid email!</p>");
    }
    else {
        $(this).css("border", "none");
        $('.mailmsg').hide();
        checkForm.mail = true;

    }
});

//--------helper functions to hide payment information depending on what is clicked-----------
function showCCInfo(){
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
}
function showpaypalInfo(){
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
}
function showbitcoinInfo(){
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
}
//----------------------------------------------------------------------------------------------




const jobRole = document.querySelector('#title');
const basicInfo = document.querySelectorAll('fieldset')[0];
//when other option selected create textarea with toggle for description
$('#title').change(function () {
    $('#other-title').hide();
    const currOption = $( "select#title option:checked" ).val();
    let otherRole = document.createElement('textarea');
    if (currOption === 'other') {
        $('#other-role').show();
    }
    else {
        console.log("da");
        $('#other-role').hide();
    }
});
//hides t-shirts based on design - only shows what is available depending on design
$('#design').change(function (e) {
    const designValue = ($('select#design option:checked')).val();
    const colorLength = $('#color').length;
    console.log(designValue);

    if (designValue === 'js puns'){
      $('#color').show();
        // $('#color option').show();
        $('.puns').show();
        $('.heart').hide();
    }
    else if (designValue === 'heart js'){
        // $('#color option').show();
        $('#color').show();
        $('.heart').show();
        $('.puns').hide();
    }
    else if (designValue === 'Select Theme'){
      $('#color').hide();
        $('#color option').hide();
        $('.puns').hide();
        $('.heart').hide();
    }
});


const activities = document.querySelector('.activities');
const totalDiv = document.createElement('div');
totalDiv.setAttribute("id", "totalDiv");
activities.appendChild(totalDiv);
//cancels out events with the same other time and totals them up. Need to have one selected
activities.addEventListener('change', (e) => {
    const inputs = $('.activities input');
    const labels = $('.activities label');
    let total=0;

    if (inputs[1].checked) {
        inputs[3].setAttribute("disabled","disabled");
    }
    else {
        inputs[3].removeAttribute("disabled");
    }
    if(inputs[3].checked) {
        inputs[1].setAttribute("disabled","disabled");
    }
    else {
        inputs[1].removeAttribute("disabled");
    }
    if (inputs[2].checked) {
        inputs[4].setAttribute("disabled","disabled");
    }
    else {
        inputs[4].removeAttribute("disabled");
    }
    if(inputs[4].checked) {
        inputs[2].setAttribute("disabled","disabled");
    }
    else {
        inputs[2].removeAttribute("disabled");
    }
    for (let i =0; i < inputs.length; i++) {
        if(inputs[i].checked){
            let str = labels[i].textContent;
            total +=parseInt(str.substring(str.indexOf("$")+1));
        }
    }
    if (total > 0) {
        totalDiv.textContent = "Total: $"+total;
        $('#totalDiv').show();
        $('.actmsg').hide();
        $('.activities').css("border","none");
        checkForm.act = true;
    }
    else {
        $('#totalDiv').hide();
        $('.activities').after("<p class='actmsg'>Must check at least one!</p>");
        $('.activities').css("border","5px solid #f11");
        checkForm.act = false;
    }
});
//show and hides other payment info
$('#payment').on('input',function (e) {
    const paymentOption = $( "select#payment option:checked" ).val();
    console.log(paymentOption);
    if (paymentOption === 'credit card' || paymentOption ==='select_method'){
        showCCInfo();
    }
    else if (paymentOption === "paypal") {
       showpaypalInfo();
       checkForm.ccnum = true;
       checkForm.zip = true;
       checkForm.cvv = true;
    }
    else{
        showbitcoinInfo();
        checkForm.ccnum = true;
        checkForm.zip = true;
        checkForm.cvv = true;
    }
});
//only accepts 13-16 digits
$('#ccnum').on('input',function (e) {
    $('.ccmsg').remove();
    const ccNum = e.target.value;
    let regex2 = /^[\d]{13,16}$/;

    if(!regex2.test(ccNum)){
        $(this).css("border","5px solid #f11");
        $(this).after("<p class='ccmsg'>Enter 13-16 digits only!</p>");
    }
    else {
        checkForm.ccnum = true;
        $(this).css("border","none");
    }
});
//throws specific errors if numbers are not in input or if length of zip is over 5 or less than 5
$('#zip').on('input',function (e) {
    $('.zipmsg').remove();
    const zipNum = e.target.value;
    const zipNumLength = zipNum.length;
    const containsLetters = /[a-zA-z]/;
    if (zipNumLength < 5 && !containsLetters.test(zipNum)){
        $(this).css("border","5px solid #f11");
        $(this).after("<p class='zipmsg'>Need 5 digits!</p>");
    }
    else if (zipNumLength > 5 && !containsLetters.test(zipNum)){
        $(this).css("border","5px solid #f11");
        $(this).after("<p class='zipmsg'>Over 5 digits!</p>");
    }
    else if (containsLetters.test(zipNum)){
        $(this).css("border","5px solid #f11");
        $(this).after("<p class='zipmsg'>Only numbers!</p>");
    }
    else {
        $(this).css("border","none");
        checkForm.zip = true;
    }
});

//throws custom errors if cvv contains letters, is over 3 or less than 3
$('#cvv').on('input',function (e) {

    $('.cvvmsg').remove();
    $(this).css("border","none");
    const cvvNum = e.target.value;
    const cvvNumLength = cvvNum.length;
    const containsLetters = /[a-zA-z]/;
    if (cvvNumLength < 3 && !containsLetters.test(cvvNum)){
        $(this).css("border","5px solid #f11");
        $(this).after("<p class='cvvmsg'>Need 3 digits!</p>");
    }
    else if (cvvNumLength > 3 && !containsLetters.test(cvvNum)){
        $(this).css("border","5px solid #f11");
        $(this).after("<p class='cvvmsg'>Over 3 digits!</p>");
    }
    else if (containsLetters.test(cvvNum)){
        $(this).css("border","5px solid #f11");
        $(this).after("<p class='cvvmsg'>Only numbers!</p>");
    }
    else if (cvvNumLength === 3){
        console.log("good");
        $('.cvvmsg').remove();
        $(this).css("border","none");
        checkForm.cvv = true;
    }
});
//iterates through checkForm and if any fields are blank or not validly inputted does not let you submit
$('#form').submit(function (e) {


    for (var key in checkForm){

        if (checkForm[key] === false){
            $('.submitmsg').remove();
            e.preventDefault();
            $('#'+key).css("border", "5px solid #f11");
            $('header').after("<p class='submitmsg'>Please fix error(s) below</p>");
            $('html,body').scrollTop(0);
        }
    }
});
