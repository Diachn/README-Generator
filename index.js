const prompt = require('inquirer').createPromptModule()
const fs = require('fs')

const api = require('./api.js')
const generateMarkdown = require('./generateMarkdown.js')

const writeToFile = (fileName, data) => {
    fs.writeFile(fileName + '.md', data, error => error ? console.error(error) : console.log(`${fileName + '.md'} generated!`))
}

const init = async _ => {
    let obj = {}
    do {
        const { userName, repo } = await prompt([{
                type: 'input',
                name: 'userName',
                message: 'What is your GitHub user name?'
            },
            {
                type: 'input',
                name: 'repo',
                message: 'What is your repository name?'
            }
        ])
        obj = await api.getUser(userName, repo)
        if (!obj) {
            console.error('Repo not found!')
        } else {
            console.log(`${obj.fullName} found!`)
        }
    } while (!obj)
    // const ghApi = await api.getUser(userName)
    Object.assign(obj, await prompt([{
            type: 'input',
            name: 'title',
            message: 'What is the project title?'
        },
        {
            type: 'input',
            name: 'desc',
            message: 'What is the project description?'
        },
        {
            type: 'input',
            name: 'inst',
            message: 'What are the installation instructions?'
        },
        {
            type: 'input',
            name: 'use',
            message: 'What is the usage description?'
        },
        {
            type: 'input',
            name: 'lic',
            message: 'What is the license?'
        },
        {
            type: 'input',
            name: 'con',
            message: 'Who are the contributors?'
        },
        {
            type: 'input',
            name: 'test',
            message: 'What are the tests?'
        },
        {
            type: 'input',
            name: 'qs',
            message: 'Any questions?'
        }
    ]))
    writeToFile(obj.title, await generateMarkdown(obj))
}

init();