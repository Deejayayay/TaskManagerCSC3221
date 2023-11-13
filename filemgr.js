const fs = require("fs/promises");

const filepath= require("./listdata.json");

//reads data from db or file
async function ReadData() {
    try {
        //makes sure file exists
        await fs.access(filepath, fs.constants.F_OK | fs.constants.W_OK | fs.constants.R_OK) 

        
        const dataIn = await fs.readFile(filepath);
        console.log(JSON.parse(dataIn));
        return JSON.parse(dataIn);
    
    } catch (error) {
        console.log(error);
        return [];
    }
}

/*---------------------------------------*/

//writed to the file or server
async function WriteData(dataOut){
    try {
        await fs.writeFile(filepath, JSON.stringify(dataOut));
        console.log('written')
        return ;
    } catch (error) {
        console.log(error);
       return ;
    }
}

exports.ReadData = ReadData;
exports.WriteData= WriteData;