
// console.log(os.platform(), os.homedir())

// fs.readFile('./docs/blo2g1.txt', (err, data) => {
//     if (err){console.log(err.errno)}
//     else{
//         console.log(data.toString())
//     }
// })
// console.log('1')

// fs.writeFile('./docs/blog1.txt', 'bla', () => {
//     console.log('written')
// })

// fs.writeFile('./docs/blog2.txt', 'bla', () => {
//     console.log('written')
// })
// if(!fs.existsSync('./assets2')) {
//     fs.mkdir('./assets2', (error) => {
//         if(error) {console.log(error.message)}
//         else{
//             console.log('folder created')
//         }
//     })
// } else {
//     fs.rmdir('./assets2', (err) => {
//         if (err) { console.log(err) }
//         else{
//             console.log('folder deleted')
//         }
//    })
// // }

// const readStream = fs.createReadStream('./docs/blogs3.txt', {encoding: 'utf8'});
// const writeStream = fs.createWriteStream('./docs/blog6.txt')
// readStream.on('data', (chunk) => {
//     writeStream.write('\nNEWCHUNK\n')
//     writeStream.write(chunk)
// })


// readStream.pipe(writeStream, 'new')

const os = require('os')
const fs = require('fs')
const http = require('http')

const _ = require('lodash')

const server = http.createServer((req, res) => {
    console.log(_.random(1,5))
    res.setHeader('Content-Type', 'text/html');

    let path = './views'

    switch(req.url) {
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path+= '/about.html';
            res.statusCode = 200;

            break;
        default:
            path += '/404.html';
            res.statusCode = 404
            break; 
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        }else {
            res.end(data)
        }
    })

});

server.listen(3000, 'localhost', () => {
    console.log('listening on request on port 3000')
})

