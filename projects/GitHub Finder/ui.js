class UI {
    constructor() {
        this.profile = document.getElementById('profile');
    }
//show profile
    showProfile(user) {
        //  console.log(user);   
        this.profile.innerHTML = `
    <div class="card card-body mb-3">
     <div class="row">
     <div class="col-md-3">
     <img class="img-fluid mb-2" src="${user.avatar_url}">
     <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-3">View profile</a>
     </div>
     <div class="col-md-9">
    <span class="badge badge-primary mb-1">Public Repos: ${user.public_repos}</span>
    <span class="badge badge-secondary mb-1">Public Gists: ${user.public_gists}</span>
    <span class="badge badge-success mb-1">Followers: ${user.followers}</span>
    <span class="badge badge-info mb-1">Following: ${user.following}</span>
     <br><br>

     <ul class"list-group">
     
     <li class="list-group-item">Company: ${user.company}</li>
     <li class="list-group-item">Website/Blog: ${user.blog}</li>
     <li class="list-group-item">Location: ${user.location}</li>
     <li class="list-group-item">Member Since: ${user.created_at}</li>

     
     </ul>
     </div>
     </div>    
    </div>
    <h3 class="page-heading mb-3">Latest Repos</h3>
    <div id="repos"></div>
    `;
    }
    //show repose
    showRepos(repos){
      let output='';
      repos.forEach(function(repo){
          output +=`
          <div class="card card-body mb-2">
          <div class="row">
          <div class="col-md-6">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          </div>
          <div class="col-md-6">

          <span class="badge badge-primary mb-1">Stars: ${repo.stargazers_count}</span>
          <span class="badge badge-secondary mb-1">Watchers: ${repo.watchers_count}</span>
          <span class="badge badge-success mb-1">Forks: ${repo.forks_count}</span>
          
          </div>

          </div>
          </div>
          `

      });
      //output
      document.getElementById('repos').innerHTML=output;
    }
//show alert message
    showAlert(message,className){
        //clear remaining alert
        this.clearAlert();
        //creat a div
        const div = document.createElement('div');
        div.className= className;
        //add text
        div.appendChild(document.createTextNode(message));
        //get parent
        const container = document.querySelector('.search-container');
        //get search box
        const search = document.querySelector('.search');
        //inserting alert 
        container.insertBefore(div,search);

        //time out after 3 seconds
        setTimeout(() => {
            this.clearAlert();
        }, 3000);

    }
    //clear alert message
    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }
//clear profile
    clearProfile(){
        this.profile.innerHTML='';
    }

}