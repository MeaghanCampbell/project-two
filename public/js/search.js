async function searchFormHandler(event) {
        event.preventDefault();
        let searchedUser = document.querySelector('.search-input').value.trim()
        if (searchedUser) {
            const response = await fetch('/api/workouts/:' + searchedUser, {
                method: 'get'
            })
            console.log(response)
    }
}

document.querySelector('.search-input-container').addEventListener('submit', searchFormHandler)