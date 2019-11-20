const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");

const questions = [
    {
        name:"username",
        message:"What is your GitHub Username?"
    },

    {
        name:"location",
        message:"Where are you from?"
    },

    {
        name:"color",
        message:"What is your favorite color?",
        choosies:["green", "yellow", "red"]
    },
];

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
