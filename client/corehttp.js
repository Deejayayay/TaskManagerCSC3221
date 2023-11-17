class coreHTTP {
    //Get Request from URL
    async get(url) {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        };
        const response = await fetch(url, requestOptions);
        if(response.ok) {
            const responseData = await response.json();
            return (responseData);
        } else {
            return (Promise.reject(response.status));
        }
    }
    /*---------------------------------------*/
    //Post Request 
    async post(url, requestData) {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestData),
        };
        const response = await fetch(url, requestOptions);
        
        if(response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            return (Promise.reject(response.status));
        }
    }
    /*---------------------------------------*/
    //put request
    async put(url, requestData) {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestData)
        };
        const response = await fetch(url, requestOptions);
        if(response.ok) {
            const responseData = await response.json();
            return (responseData);
        } else {
            return (Promise.reject(response.status));
        }
    }

    /*---------------------------------------*/
    //delete 
    async delete(url) {
        const requestOptions = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        };
        const response = await fetch(url, requestOptions);
        if(response.ok) {
            return ({});
        } else {
            return (Promise.reject(response.status));
        }
    }
}
