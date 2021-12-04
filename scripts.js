var myInput = document.querySelector('#myInput');
var myDiv   = document.querySelector('#myDiv');
var apiUrl  = 'https://api.github.com/search/repositories?q=';
var projectList = new Rx.BehaviorSubject([]);
var inputs  = Rx.Observable.fromEvent(myInput, 'keyup');

inputs
.debounce(() => Rx.Observable.interval(500))
.map(event => event.target.value)
.filter(inputValue => inputValue.length > 2)
.subscribe(searchProjects);

function searchProjects(projectName) {
    Rx.Observable.fromPromise(fetch(`${apiUrl}${projectName}`))
        .subscribe(response => {
            response
                .json()
                .then(projectItems => projectList.next(projectItems.items));
        }); 
}

projectList.subscribe(projects =>{
    var template = '';
    projects.forEach(project => {
        template += `
            <li class="project-list-item">
                <img class="project-owner-avatar" src="${project.owner.avatar_url}">
                <div class="project-info">
                    <b>${project.owner.login}</b> / ${project.full_name}
                </div>
                <div class="project-info">
                    Forks: ${project.forks}
                </div>            
            </li>
        `;
    });
    myDiv.innerHTML = `<ul class="project-list">${template}</ul>`;
});