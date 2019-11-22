const fs = require('fs')

let file = fs.readFileSync('statistic.json','utf-8')

console.log(file)

file = JSON.parse(file)

for(let day in file){
	console.log(day)
	for(let i = 0;i < 24;i++){
		let onlinePerHour = file[day][i].map(el=> parseInt(el,10))
		let arrSum = onlinePerHour => onlinePerHour.reduce((a,b) => a + b, 0)
		let lengthOnliner = onlinePerHour.length
		console.log(`${i}: ${arrSum/lengthOnliner}`)
	}

}