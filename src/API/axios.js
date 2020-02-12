import axios from 'axios';

export const Axios = {
    post: (data) => {
        console.log(JSON.stringify(data));
        axios.post(`http://localhost:3000/task`,{
            body: JSON.stringify(data)
        })
        .then(response => {
            // JSON responses are automatically parsed.
            if(response.status === 200)
                return response.status;
          })
          .catch(e => {
            console.log(e)
          })
    }
  };