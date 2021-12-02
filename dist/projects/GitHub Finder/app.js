//init github class
const github = new Github;

//init UI
const ui = new UI;

//search input
const searchUser = document.getElementById('searchuser');

//search input event listener
searchUser.addEventListener('keyup',(e) => {
    // console.log('yo did')
   //get input text;
   const userText = e.target.value;

if(userText !=''){
    // console.log(userText);
    //making http call
    github.getUser(userText)
    .then(data =>{
        // console.log(data);
        if(data.profile.message === 'Not Found'){
          //show alert
          ui.showAlert('User not found', 'alert alert-danger')

        }else{
            //show profile
            ui.showProfile(data.profile);
            ui.showRepos(data.repos);

        }
    })
} else{
    //clear profile
    ui.clearProfile()

}
})