let first_id = 0
let second_id = 0


let reporters = require('jasmine-reporters');
let TeamCityReporter = new reporters.TeamCityReporter ({
    savePath: __dirname,
    consolidateAll: false
});

const token = "v3fl8l8NrDoAAAAAAAAAAZwVFF7Kv-mSPol8yHPXXi-BIKZq_p4kYGaRvq1snwfX"; 
jasmine.getEnv().addReporter(TeamCityReporter)

describe("upload hello.txt to server", function() {
  let axios = require('axios');
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  let config = {
      method: 'post',
      url: 'https://content.dropboxapi.com/2/files/upload',
      headers: { 
       'Dropbox-API-Arg': '{"mode":"add","autorename":true,"mute":false,"path":"/hello.txt"}', 
       'Content-Type': 'application/octet-stream'
     },
      data : {
       binary: "/Users/i5-8600K/api_js_axios/hello.txt"
     }
    };

  it("have to be successfully uploaded", async function() {

    let response_status = 500;

    await axios(config)
      .then( function (response) {
        response_status  = response.status;
        first_id = response.id;
      })
      .catch(function (error) {
         console.log(error);
      });

  expect(response_status).toBe(200);
    
  }, 10000);
});



describe("get metadata from request", function(){
  let axios = require('axios');
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  let config = {
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

  it("have to be successfully got data", async function() {
    let response_status = 500;

    await axios(config)
    .then(function (response) {
      response_status = response.status;
    })
    .catch(function (error) {
      console.log(error);
    });

    expect(response_status).toBe(200);
    
  }, 10000);

  it("have to be the same id as request", async function(){
    await axios(config)
    .then(function (response) {
      second_id = response.id;
    })
    .catch(function (error) {
      console.log(error);
    });
    expect(second_id).toBe(first_id);
  });
});



describe("delete from server", function(){
  let axios = require('axios');
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  it("have to be successfully deleted", async function() {
    let config3 = {
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

  let response_status = 500;

  await axios(config3)
    .then(function (response) {
      response_status = response.status;
    })
    .catch(function (error) {
       console.log(error);
    });


  expect(response_status).toBe(200);
    
  }, 10000);

});
