$(document).ready(function(){
	
	var trainData = new Firebase("https://train-database.firebaseio.com/");


	$("#addTrain").on("click", function(){

		
		var name = $("#trainNameInput").val().trim();
		var lineName = $("#lineInput").val().trim();
		var targetDestination = $("#destinationInput").val().trim();
		var timeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequency = $("#frequencyInput").val().trim();

		console.log(name);
		console.log(lineName);
		console.log(targetDestination);
		console.log(timeInput);
		console.log(frequency);

		var newTrain = {
			name: name,
			line: lineName,
			destination: targetDestination,
			trainTime: timeInput,
			frequency: frequency,
		}

		trainData.push(newTrain);


		$("#trainNameInput").val("");
		$("#lineInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

		return false;
	});
	
	trainData.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		var firebaseName = childSnapshot.val().name;
		var firebaseLine = childSnapshot.val().line;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
	
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
});


