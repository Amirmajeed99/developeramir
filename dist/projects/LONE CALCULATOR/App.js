//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){

     //hide results
     document.getElementById('results').style.display='none';

     //show loader
     document.getElementById('loading').style.display='block';
     
     //show loader for 2 seconds or calculate results after 2 seconds
     setTimeout(calculateResult ,2000);
    e.preventDefault();
});

//calculate RESULTS
function calculateResult() {
    // console.log('you clicked the submit form');

    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const yearsToRepay = document.getElementById('years');
    const monthlypayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

// now we need value of amount,interest & yearstopay in float;
    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(yearsToRepay.value) * 12;

    // compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principle * x * calculatedInterest) / (x - 1);//give us monthly payment

    if (isFinite(monthly)) {
        monthlypayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principle).toFixed(2);

        //show result
        document.getElementById('results').style.display='block';
        //hide loader
        document.getElementById('loading').style.display='none';
    } else {
        showError('please check your numbers');//custom function
    }
    
}

//showError function
function showError(error){
    //if there is an error we have to hide the result and loader
    document.getElementById('results').style.display='none';
    //hiding loader
    document.getElementById('loading').style.display='none';
    //create a div
    const errorDiv=document.createElement('div');

    //ADD class
    errorDiv.className='alert alert-danger';
    //create textnode and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //now we have to insert it into the dom
    const card=document.querySelector('.card');
    const heading=document.querySelector('.heading');

    //insert error above heading
    card.insertBefore(errorDiv, heading);

   //CLEAR ERROR AFTER FEW SECONDS
   //for that we use set time out method 
   setTimeout(clearError, 3000);
    // console.log(errorDiv);
}

//clearError function
function clearError(){
    document.querySelector('.alert').remove();
}

