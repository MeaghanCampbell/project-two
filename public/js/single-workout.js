async function saveSessionHandler(event) {
    event.preventDefault();
    
     
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'PUT',
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
