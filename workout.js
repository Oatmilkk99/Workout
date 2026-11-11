let starting = document.getElementById("starting...")
let ending = document.getElementById("ending...")
let starttime = 0
let endtime = 0
let timer = document.getElementById("timer")
let intervalId = 0

 // Listeners
starting.addEventListener("click",triggerstarttimer )
ending.addEventListener("click",triggerendtimer)
function triggerendtimer()
{
	//TO DO: STOP DA TIMER
	clearInterval(intervalId)
	starting.disabled=false
	starting.classList.remove("opacity-50")
	starting.classList.add("opacity-100")
}
function triggertimerchange()
{
 	endtime=Date.now()
 	console.log(endtime-starttime)
 	let totaltime = endtime-starttime
 	let seconds = (totaltime/1000)%60
 	let minutes = totaltime/60000
 	let minutes_text = Math.trunc(minutes)
 	let seconds_text = Math.trunc(seconds)
 	if(minutes_text<10) 
 	{
 		minutes_text="0"+minutes_text 
 	}
 	if(seconds_text<10)
 	{
 		seconds_text="0"+seconds_text
 	}
 	timer.innerText = minutes_text+":"+seconds_text
}
function triggerstarttimer()
{
	console.log("Start button is clickeddd!!!")
	//Saving the current time
	starttime=Date.now()
	intervalId = setInterval(triggertimerchange,1000)
	starting.disabled=true
	starting.classList.remove("opacity-100")
	starting.classList.add("opacity-50")

}





