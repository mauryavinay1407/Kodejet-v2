const fs = require('fs');
const { exec } = require("child_process");
const path = require("path");

const dirOutput=path.join(__dirname,'..','outputs');

if(!fs.existsSync(dirOutput))
    fs.mkdirSync(dirOutput,{recursive:true});

const executeC = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath=path.join(dirOutput,`${jobId}.out`);

  return new Promise((resolve, reject) => {
    exec(`gcc ${filepath} -o ${outPath} && ${outPath}`, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

module.exports = { executeC };
