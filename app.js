
var array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var flag;
var memory_values = [];
var memory_tile_ids = [];
var flipped_tile_array = [];
var tiles_flipped = 0;
var moves = 0;
function shuffle() {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
};
function newBoard(){
   //setting flat to 0
    flag = 0;
    //setting flipped tiles to 0
	tiles_flipped = 0;
	var output = '';
    console.log(array);
    shuffle();
    console.log(array);
	for(var i = 0; i < array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    document.getElementById('flipped').innerHTML = "Tile(s) Flipped = "+tiles_flipped;
}
function memoryFlipTile(tile,val){
    if(flag==0)
        {
           startTimer();
        }
    flag++;
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(memory_values.length == 0){
           
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
                document.getElementById('flipped').innerHTML = "Tile(s) Flipped "+tiles_flipped;
                //push into flipped array...
                flipped_tile_array.push(memory_values[0]);
                flipped_tile_array.push(memory_values[1]);
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == array.length){
					alert("Board cleared... generating new board");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = '#b0b0f0';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = '#b0b0f0';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}
  	