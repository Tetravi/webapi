const token = "v3fl8l8NrDoAAAAAAAAAAZwVFF7Kv-mSPol8yHPXXi-BIKZq_p4kYGaRvq1snwfX";
let reporters = require('jasmine-reporters');

let TeamCityReporter = new reporters.TeamCityReporter ({
    savePath: __dirname,
    consolidateAll: false
});

jasmine.getEnv().addReporter(TeamCityReporter)

describe("Upload file to dropbox", function() {
  let axios = require('axios');
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  let postMethod = {
      method: 'post',
      url: 'https://content.dropboxapi.com/2/files/upload',
      headers: { 
       'Dropbox-API-Arg': '{"mode":"add","autorename":true,"mute":false,"path":"/hello.txt"}', 
       'Content-Type': 'application/octet-stream'
     },
      data : {
       binary: "/hello.txt"
     }
    };

  it("All loaded successfuly", async function() {
      let responseStatus =0;
      await axios(postMethod)
      .then( function (response) {
        responseStatus  = response.status;
      })
      .catch(function (error) {
         console.log(error);
      });

  expect(responseStatus).toBe(200);
    
  }, 10000);
});

describe("Get metadata", function(){
  let axios = require('axios');
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  let getMethod = {
       method: 'post',
       url: 'https://api.dropboxapi.com/2/files/get_metadata',
       headers: { 
         'Content-Type': 'application/json', 
         'Authorization': `Bearer ${token}`
       },
       data : {
        "path":"/hello.txt"
       }
    };

  it("Metadata gotten successfuly", async function() {

    let responseStatus =0;
    await axios(getMethod)
    .then(function (response) {
      responseStatus = response.status;
    })
    .catch(function (error) {
      console.log(error);
    });

    expect(responseStatus).toBe(200);
  }, 10000);
});

describe("Delete file", function(){
  let axios = require('axios');
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  it("Deleted successfuly", async function() {
    let deleteMethod = {
    method: 'post',
    url: 'https://api.dropboxapi.com/2/files/delete_v2',
    headers: { 
    'Authorization': `Bearer ${token}`, 
    'Content-Type': 'application/json'
    },
    data : {
        "path":"/hello.txt"
    }
};
  let responseStatus =0;
  await axios(deleteMethod)
    .then(function (response) {
      responseStatus = response.status;
    })
    .catch(function (error) {
       console.log(error);
    });
  expect(responseStatus).toBe(200);    
  }, 10000);
});
