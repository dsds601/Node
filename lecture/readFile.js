const fs = require('fs').promises;

fs.writeFile('./test.txt' , '글이 입력됩니다.')
.then(() => {
    console.log('입력 완료');
})
.catch((err) => {
    throw err;
})

