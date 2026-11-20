window.addEventListener("load",triggershowchart)
function triggershowchart()
{
	//get the history if it's been saved
	let history = []
	if(localStorage.getItem("history")!=null)
	{
		history = JSON.parse(localStorage.getItem("history"))
	}
	//SAVE DISTTANCE & TTIME
	if (DISTANCE!= 0)
	{
		history.push({"distance":DISTANCE,"totaltime":TOTALTIME})
	}
	history = history.slice(history.length-4)
	localStorage.setItem("history",JSON.stringify(history))
	if(CHART!=null)
		{
			CHART.destroy()
	  }
	CHART = new Chart(
    document.getElementById("drawingg"),
    {
      type: 'bar',
      data: {
        labels: history.map(row => row.distance/1000),
        datasets: [
          {
            label: 'Distance',
            backgroundColor:"#E30B5D",
            data: history.map((row) => 
            	{
            		let seconds = (row.totaltime/1000)%60
 	let minutes = row.totaltime/60000
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
 	return seconds

            	})
          }
        ]
      }
    }
  );
}