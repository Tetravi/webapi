
let axios = require('axios');

class BaseRequest{

    constructor( token,userMethod,userUrl, userHeader={}, userData={}) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        this.method = userMethod;
        this.url = userUrl;
        this.header = userHeader;
        this.data = userData;
    }

    run(expectation){
        let resMethod = {method:this.method,
                         url: this.url,
                         headers: this.header,
                         data: this.data};

        it(expectation, async function() {
            let responseStatus =0;
            try{
                let response = await axios(resMethod);
                responseStatus = response.status;
            }catch(error){
                console.log(error);
            }

            expect(responseStatus).toBe(200);}, 10000);
        }
}

module.exports = BaseRequest;