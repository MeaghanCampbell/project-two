async function editBenchmarkHandler(event) {
    event.preventDefault();
  
    const boulder_grade = document.querySelector('#boulder-grade').value.trim();
    const route_grade = document.querySelector('#route-grade').value.trim();
    
    const 
    
    const response = await fetch(`/api/benchmarks/:${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        boulder_grade,
        route_grade
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      console.log(response.ok)
      document.location.replace('/dashboard');
    } //else {
    
    // }
  }
  
document.querySelector('#update-benchmark-form').addEventListener('submit', editBenchmarkHandler);