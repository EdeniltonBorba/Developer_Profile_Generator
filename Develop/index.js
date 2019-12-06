const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const pdfPuppeteer = require("pdf-puppeteer");
const html = require("./generateHTML.js");
var userGitHub;

const questions = [
    {
        name:"username",
        message:"What is your GitHub Username?"
    },

    {
        name:"color",
        message:"What is your favourite color?"
    },

  
];

async function init() {
    const userProfile = await inquirer.prompt(questions);

    var username = userProfile.githubUsername;
    var githubUrl = `https://api.github.com/users/${username}`;
    var starrepoUrl = `https://api.github.com/users/${username}/starred?`;

    const gitResponse = await axios.get(githubUrl);

    userProfile.urlGit = gitResponse.data.html_url;
    userProfile.following = gitResponse.data.following;
    userProfile.currently = gitResponse.data.company;
    userProfile.imgUrl = gitResponse.data.avatar_url;
    userProfile.location = gitResponse.data.location;
    userProfile.public_repos = gitResponse.data.public_repos;
    userProfile.followers = gitResponse.data.followers;
    userProfile.name = gitResponse.data.name;

    const gitStarReponse = await axios.get(starrepoUrl);


    userProfile.starrepos = gitStarReponse.data.length;





}

inquirer.prompt(questions)
.then(function(resp){
    userGitHub = resp;
    console.log(`Hallo ${resp.username} `);
    inquirer.prompt({
        name:"color",
        message:"What is your favorite color?",
        type: "list",
        choices:["green", "yellow", "red"],
        filter: function(str){
            return str.toLowerCase();
        }
   })
   .then( function(resp){
       console.log(`Color favorite ${resp.username} ist ${resp.color} `);
   });

});

/*
function writeToFile(fileName, data) {
    fs.writeFile(`${fileName}.html`, data, err => {
        if (err) throw err;
    });
 
};

function init() {
    inquirer.prompt(questions).then(data => {
        let username = data.username;
        let gitHubUrl = `https://api.github.com/users/${username}`;
        let starRepoUrl = `https://api.github.com/users/${username}/starred?`

        axios
        
        .get(gitHubUrl)
        .then(response => {
            data.name = response.data.avatar_url;
        });
    });
}


init();
*/