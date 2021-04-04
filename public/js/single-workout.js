async function saveSessionHandler(event) {
    event.preventDefault();
    
    const date = document.querySelector('#date').value.trim();
    const category = document.querySelector('#category').value.trim();
    const time = document.querySelector('#time').value.trim();
    const level = document.querySelector('#level').value.trim();
    const description = document.querySelector('#description').value.trim();
           
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'POST',
        body: JSON.stringify({
            date,
            category,
            time,
            level,
            description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        console.log(response.ok)
        document.location.replace('/dashboard/savedworkouts');
      }
    }
    
  document.querySelector('#save-session-form').addEventListener('submit', saveSessionHandler);
