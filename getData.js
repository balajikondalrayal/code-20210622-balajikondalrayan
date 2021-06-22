const fs = require('fs');

export default (dataCount = 0) => {
    // Connsider this as fetching data from server/DB for now
    // When the data is higher, we will be fetching the data for server/DB by paging or batching
    const rawdata = fs.readFileSync('data.json');
    const medicalData  = JSON.parse(rawdata);
    if(dataCount) {
        while(medicalData.length < dataCount) {
            medicalData.push(...medicalData)
        }
    }
    return medicalData
}