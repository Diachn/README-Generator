const generateMarkdown = data => {
    return `
 
  # ${data.title.toUpperCase()}
  ![License: ${(data.lic) ? data.lic : 'None'}](https://img.shields.io/badge/License-${(data.lic) ? data.lic : 'None'}-brightgreen)
  _Repo by ${data.name}_
  ---
  __${data.desc}__
  ---
  __Installation:__
  ${data.inst}
  ---
  __Usage:__
  ${data.use}
  ---
  __Contributors:__
  ${data.con}
  ---
  __Tests:__
  ${data.test}
  ---
  __Questions:__
  ${data.link}
  `
}

module.exports = generateMarkdown