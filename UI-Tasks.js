
// Set active project title and description

export function updateActiveProject(index) {

   // const updateProjectTitle = () => {
        const activeProjectDetails = document.querySelector('.active-project-description')


        if (allProjects.length) {
            activeProjectDetails.innerHTML = ''

            const activeTitle = document.createElement('h3');
            activeTitle.innerText = allProjects[index].name;

            const activeDescription = document.createElement('h5');
            activeDescription.innerText = allProjects[index].description;

            const addTaskButton = document.createElement('button');
            addTaskButton.innerText = 'Add Task';

            activeProjectDetails.appendChild(activeTitle)
            activeProjectDetails.appendChild(activeDescription)
            activeProjectDetails.appendChild(addTaskButton)
        } else {
            activeProjectDetails.innerHTML = ''
 //       }
    }


}
