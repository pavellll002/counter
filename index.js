const request = require('request')
const fs 		= require('fs')
const {
  listTimeZones, findTimeZone, getZonedTime, getUnixTime 
} = require('timezone-support')


let check = ()=>
{
	//get file
	request('https://chatvdvoem.ru/',(err,res,body)=>
	{
		if(err) return console.log(err)
		let str = body//body file
		//number of online
		let online = str.match(/<strong id="online_counter">(\d*)<\/strong>/)

		//file for saving online
		let statistic = fs.readFileSync('statistic.json','utf-8'),
		nativeTime = new Date(),
		moscow = findTimeZone('Europe/Moscow'),
		moscowTime = getZonedTime(nativeTime, moscow),
		day = moscowTime.dayOfWeek,
		hour = moscowTime.hours,
		days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
		

		statistic =	JSON.parse(statistic)
		//add online
		statistic[days[day]][hour].push(online[1])
		statistic = JSON.stringify(statistic)
		//save online to the file
		fs.writeFileSync('statistic.json',statistic)


	}
	)
}

setInterval(check, 1000*1)