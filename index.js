const request = require('request')
const fs 		= require('fs')


let check = ()=>{
	//get file
	request('https://chatvdvoem.ru/',(err,res,body)=>{

		let str = body//body file
		//number of online
		let online = str.match(/<strong id="online_counter">(\d*)<\/strong>/)

		//file for saving online
		let statistic = fs.readFileSync('statistic.json','utf-8'),
		date = new Date(),
		day = date.getDay(),
		hour = date.getHours(),
		days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
		

		statistic =	JSON.parse(statistic)
		//add online
		statistic[days[day]][hour].push(online[1])
		console.log(statistic)
		statistic = JSON.stringify(statistic)
		//save online to the file
		fs.writeFileSync('statistic.json',statistic)


	})
}

setInterval(check, 1000*60*10)