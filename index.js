#! /usr/bin/env node

const fs = require("fs");
const jwt = require("jsonwebtoken");


const questions = [
  {
    type: "input",
    name: "teamId",
    message: "Enter your Apple Developer Team ID: "
  },
  {
    type: "input",
    name: "clientId",
    message: "Enter your client ID: "
  },
  {
    type: "input",
    name: "keyId",
    message: "Enter your key ID: "
  },
  {
    type: "input",
    name: "keyPath",
    message: "Enter the path to your key: "
  },
];

const main = async () => {
  const inquirer = await import("inquirer");

  inquirer.createPromptModule()(questions).then(answers => {
    const { teamId, clientId, keyId, keyPath } = answers;
    const key = fs.readFileSync(keyPath);
    const token = jwt.sign({}, key, {
      algorithm: "ES256",
      expiresIn: "180d",
      issuer: teamId,
      header: {
        alg: "ES256",
        kid: keyId
      },
      subject: clientId,
      audience: "https://appleid.apple.com",
    });
    console.log(`Your token is:\n${token}`);
  });
}

main();