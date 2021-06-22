const fs = require('fs');

export default (data) => {
    // Connsider this as fetching data from server for now
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4))
}