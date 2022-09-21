const http=require("http");
const fs=require("fs");
var requests=require("requests");
const homeFile=fs.readFileSync("index.html","utf-8");

  const replaceVal=(tempVal,orgVal)=>{
    let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
     temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min)
     temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max)
     temperature=temperature.replace("{%location%}",orgVal.name)
     temperature=temperature.replace("{%country%}",orgVal.sys.country);
     temperature=temperature.replace("{%tempratureSt%}",orgVal.weather[0].main);
     
     return temperature;
} 

const server=http.createServer((req,res)=>{
    if(req.url=="/")
    {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=6874225ebe23c260977ad879d47e64ed")
        .on("data",(chunk)=>{
            const objdata=JSON.parse(chunk);
            const arrData=[objdata];
            // console.log(arrData[0].main.temp);
            const realTimeData=arrData.map(val=>
                replaceVal(homeFile,val)).join(" ");
                res.write(realTimeData);
                // console.log(realTimeData);
        })
        .on("end",(err)=>{
            if(err) return console.log("connection closed due to error");

            res.end();
        })
   
    }
});
server.listen(8000,"127.0.0.1"
,()=>{
    console.log("listening to the port no 8000");
});































//https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=6874225ebe23c260977ad879d47e64ed











// https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=ac4534dc74f882aba3676a2edf2d6a30