const token = "v3fl8l8NrDoAAAAAAAAAAZwVFF7Kv-mSPol8yHPXXi-BIKZq_p4kYGaRvq1snwfX";
let reporters = require('jasmine-reporters');

let TeamCityReporter = new reporters.TeamCityReporter ({
    savePath: __dirname,
    consolidateAll: false
});

jasmine.getEnv().addReporter(TeamCityReporter)

let Request = require('./../Request');

describe("Upload file to dropbox", function() {
  let request = new Request(token,"post", "https://content.dropboxapi.com/2/files/upload",
                               {'Dropbox-API-Arg': '{"mode":"add","autorename":true,"mute":false,"path":"/hello.txt"}',
                                'Content-Type': 'application/octet-stream'},
                               {binary: "/hello.txt"});

  request.run("File loaded successfully");
});

describe("Get metadata", function(){
    let request = new Request(token, "post","https://api.dropboxapi.com/2/files/get_metadata",
                                 {'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`},
                                 {"path":"/hello.txt"});

    request.run("Metadata gotten successfully");
});

describe("Delete file", function(){
    let request = new Request(token,'post','https://api.dropboxapi.com/2/files/delete_v2',
                                 {'Authorization': `Bearer ${token}`,
                                  'Content-Type': 'application/json'},
                                 {"path":"/hello.txt"});

    request.run("Deleted successfully");
});