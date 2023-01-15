const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('../README.md' , {highWaterMark : 16});// 16kb 씩 나눠서 읽습니다.
const writeStream = fs.createWriteStream('./writeItem.txt');
const gzip = zlib.createGzip();
readStream.pipe(writeStream); // read 와 write를 pipe로 연결 16byte씩 읽으면서 16byte씩 작성 합니다.
readStream.pipe(gzip).pipe(writeStream); // 읽은 파일을 압축하여 작성합니다.
// 파이프끼리 여러개 체이닝 할 수 있습니다.