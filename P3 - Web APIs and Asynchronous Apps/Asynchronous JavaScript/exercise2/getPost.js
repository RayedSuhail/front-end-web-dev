// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    }
}

// TODO-Async GET
const retrieveData = async (url='') => {
    const request = await fetch(url);
    try{
        const allData = await request.json()
    } catch(error) {
        console.log("error", error);
    }
}