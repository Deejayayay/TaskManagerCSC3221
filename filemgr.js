const fs = require("fs/promises");

const filepath= "listdata.json";

//reads data from db or file
async function ReadData() {
    try {
        //makes sure file exists
        if(!fs.access(filepath, fs.constants.F_OK | fs.constants.W_OK | fs.constants.R_OK)) {
            return null;
        } else {
            const dataIn = await fs.readFile(filepath);
            console.log(JSON.parse(dataIn));
            return JSON.parse(dataIn);
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

/*---------------------------------------*/

//writed to the file or server
async function WriteData(){
    try {
        await fs.writeFile(filepath, JSON.stringify(dataOut));
        return ;
    } catch (error) {
        return ;
    }
}

exports.Read = ReadData;
exports.Write = WriteData;