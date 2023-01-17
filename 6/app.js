const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.set('port' , process.env.PORT || 3000 ); // app에 속성을 부혀하는 느낌 전역변수에 느김
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json()); // json를 인코딩 해서 body 로 넣어줌
app.use(express.urlencoded({extended : true})); // form parsing / true시 qs라는 모듈을 사용합니다. false는 queryString 사용 합니다.
// 이미지는 멀터 라는 걸 사용

app.use((req , res , next) => {
    next();
});

app.get('/' , (req,res, next) => {
    res.sendFile(path.join(__dirname , 'index.html'));
    next('route');
})

app.get('/' , (req , res) => {
    res.send('test');
})

app.listen(app.get('port') , () => {
    console.log('port start');
});