var board;

$(document).ready(function () {




board = [new Array(new Rook(0, 0, "rook", "black"), new Knight(0, 1, "knight", "black"), new Bishop(0, 2, "bishop", "black"), new Queen(0, 3, "queen", "black"), new King(0, 4, "king", "black"), new Bishop(0, 5, "bishop", "black"), new Knight(0, 6, "knight", "black"), new Rook(0, 7, "rook", "black")),    
			 new Array(new Pawn(1, 0, "pawn", "black", true), new Pawn(1, 1, "pawn", "black", true), new Pawn(1, 2, "pawn", "black", true), new Pawn(1, 3, "pawn", "black", true), new Pawn(1, 4, "pawn", "black", true), new Pawn(1, 5, "pawn", "black", true), new Pawn(1, 6, "pawn", "black", true), new Pawn(1, 7, "pawn", "black", true)),
			 new Array(8),
			 new Array(8), 
			 new Array(8),
			 new Array(8),
			 new Array(new Pawn(6, 0, "pawn", "white", true), new Pawn(6, 1, "pawn", "white", true), new Pawn(6, 2, "pawn", "white", true), new Pawn(6, 3, "pawn", "white", true), new Pawn(6, 4, "pawn", "white", true), new Pawn(6, 5, "pawn", "white", true), new Pawn(6, 6, "pawn", "white", true), new Pawn(6, 7, "pawn", "white", true)), 
			 new Array(new Rook(7, 0, "rook", "white"), new Knight(7, 1, "knight", "white"), new Bishop(7, 2, "bishop", "white"), new Queen(7, 3, "queen", "white"), new King(7, 4, "king", "white"), new Bishop(7, 5, "bishop", "white"), new Knight(7, 6, "knight", "white"), new Rook(7, 7, "rook", "white"))
			 ];
console.log(board);



var pieceClickedData = 0,
	pieceClickedId = 0,
	pieceClickedX = 0,
	pieceClickedY = 0,
	pieceClickedId = 0,
	whiteKingData = dataForSquare(0, 4),
	blackKingData = dataForSquare(7, 4),
	moveArray = [],
	originalData = 0;


	
	for (var row = 0; row < board.length; row++) {

		$("#dat-board").append(
			$('<div>').attr("id","row" + row).attr("class", "row")
		);
		for (var col = 0; col < board[row].length; col++) {
			var cell = $('<div>').attr("id", "square" + [row] + [col]).addClass("square");

			if ((col + row) % 2 === 0) {
				cell.addClass('odds');
			}
			if ((col + row) % 2 === 1) {	
				cell.addClass('even');
			}
			if(row === 1){
				var blackPawn = String.fromCharCode(parseInt("265F", 16));
				cell.addClass('piece pawn black black-pawn').html(blackPawn);
			}
			if(row === 6){
				var whitePawn = String.fromCharCode(parseInt("2659", 16));
				cell.addClass('piece pawn white white-pawn').html(whitePawn);
			}
			if(row === 0 && (col === 0 || col === 7)){
				var blackRook = String.fromCharCode(parseInt("265C", 16));
				cell.addClass('piece rook black black-rook').html(blackRook);
			}
			if(row === 7 && (col === 0 || col === 7)){
				var whiteRook = String.fromCharCode(parseInt("2656", 16));
				cell.addClass('piece rook white white-rook').html(whiteRook);
			}
			if(row === 0 && (col === 1 || col === 6)){
				var blackKnight = String.fromCharCode(parseInt("265E", 16));
				cell.addClass('piece knight black black-knight').html(blackKnight);
			}
			if(row === 7 && (col === 1 || col === 6)){
				var whiteKnight = String.fromCharCode(parseInt("2658", 16));
				cell.addClass('piece knight white white-knight').html(whiteKnight);
			}
			if(row === 0 && (col === 2 || col === 5)){
				var blackBishop = String.fromCharCode(parseInt("265D", 16));
				cell.addClass('piece bishop black black-bishop').html(blackBishop);
			}
			if(row === 7 && (col === 2 || col === 5)){
				var whiteBishop = String.fromCharCode(parseInt("2657", 16));
				cell.addClass('piece bishop white white-bishop').html(whiteBishop);
			}
			if(row === 0 && col === 3){
				var blackQueen = String.fromCharCode(parseInt("265B", 16));
				cell.addClass('piece queen black black-queen').html(blackQueen);
			}
			if(row === 7 && col === 3){ 
				var whiteQueen = String.fromCharCode(parseInt("2655", 16));
				cell.addClass('piece queen white white-queen').html(whiteQueen);
			}
			if(row === 0 && col === 4){
				var blackKing = String.fromCharCode(parseInt("265A", 16));
				cell.addClass('piece king black black-king').html(blackKing);
			}
			if(row === 7 && col === 4){
				var whiteKing = String.fromCharCode(parseInt("2654", 16));
				cell.addClass('piece king white white-king').html(whiteKing);
			}
			$("#row" + row).append(cell);

		}
	}
//vw for screen size responsiveness

var blackTurn = false;

function Piece(row, col, type, color){
	this.type = type,
	this.row = row,
	this.col = col,
	this.color = color,
	this.highlight = function(targetsArray){
		for(var i = 0; i < targetsArray.length; i++){
			$("#square" + targetsArray[i].row + targetsArray[i].col).addClass("highlight");
			console.log("#square" + targetsArray[i].row + targetsArray[i].col);
		}
	}
}


function Rook(row, col, type, color){
	Piece.call(this, row, col, type, color);
	Rook.prototype.move = function(){
		$('div').removeClass("highlight");
		var canMoveUp = true;
		var canMoveDown = true;
		var canMoveLeft = true;
		var canMoveRight = true;
		var row = this.row;
		var col = this.col;
		var targets = [];
		for (var i = 1; i < 8; i++) {
			if(canMoveUp === true){
				if(isOnTheBoard((row + i),col)){
					if(!(isFriend((row, col, row + i),col))){		
						if(isEmpty((row + i),col)){
							targets.push({
								row: (row + i),
								col: col
							});
						}
						else if(hasEnemyPiece(row, col, (row+i), col)){
							targets.push({
								row: (row + i),
								col: col
							});
							canMoveUp = false;
						}
						else{
							canMoveUp = false;
						}
					}
					else{
						canMoveUp = false;
					}	
				}
				else{
					canMoveUp = false;
				}	
			}
			if(canMoveDown === true){
				if(isOnTheBoard((row - i),col)){	
					if(!(isFriend(row, col, (row-i), col))){		
						if(isEmpty((row - i),col)){
							targets.push({
								row: (row - i),
								col: col
							});
						}
						else if (hasEnemyPiece(row, col, (row-i), col)){
							targets.push({
								row: (row - i),
								col: col
							});
							canMoveDown = false;
						}
						else{
							canMoveDown = false;
						}
					}
					else{
						canMoveDown = false;
					}
				}		
				else{
					canMoveDown = false;
				}
			}	
			if(canMoveRight === true){
				if(isOnTheBoard(row,(col+i))){
					if(!(isFriend(row, col, row, (col+i)))){		
						if(isEmpty(row,(col+i))){
							targets.push({
								row: row,
								col: (col+i)
							});
						}
						else if(hasEnemyPiece(row, col, row, (col+i))){
							targets.push({
								row: row,
								col: (col+i)
							});
							canMoveRight = false;
						}
						else{
							canMoveRight = false;
						}
					}
					else{
						canMoveRight = false;
					}
				}		
				else{
					canMoveRight = false;
				}
			}	
			if(canMoveLeft === true){
				if(isOnTheBoard(row,(col-i))){
					if(!(isFriend(row, col, row, (col-i)))){		
						if(isEmpty(row,(col-i))){
							targets.push({
								row: row,
								col: (col-i)
							});
						}
						else if(hasEnemyPiece(row, col, row, (col-i))){
							targets.push({
								row: row,
								col: (col-i)
							});
							canMoveLeft = false;
						}
						else{
							canMoveLeft = false;
						}
					}
					else{
						canMoveLeft = false;
					}
				}		
				else{
					canMoveLeft = false;
				}
			}	
		}
		canMoveUp = true;
		canMoveDown = true;
		canMoveLeft = true;
		canMoveRight = true;
		return targets;
	}
}



function Bishop(row, col, type, color){
	Piece.call(this, row, col, type, color);
	Bishop.prototype.move = function(){
		$('div').removeClass("highlight");
		var upRight = true;
		var upLeft = true;
		var downRight = true;
		var downLeft = true;
		var row = this.row;
		var col = this.col;
		var targets = [];
		for (var i = 1; i < 8; i++) {
			if(downRight === true){
				if(isOnTheBoard((row + i),(col + i))){
					if(!(isFriend(row, col, (row+i), (col + i)))){		
						if(isEmpty((row + i),(col + i))){
							targets.push({
								row: (row + i),
								col: (col + i)
							});
						}
						else if(hasEnemyPiece(row, col, (row+i), (col + i))){
							targets.push({
								row: (row + i),
								col: (col + i)
							});
							downRight = false;
						}
						else{
							downRight = false;
						}
					}
					else{
						downRight = false;
					}	
				}
				else{
					downRight = false;
				}
			}
			if(upRight === true){	
				if(isOnTheBoard((row - i),(col + i))){
					if(!(isFriend(row, col, (row - i), (col + i)))){		
						if(isEmpty((row - i),(col + i))){
							targets.push({
								row: (row - i),
								col: (col + i)
							});
						}
						else if(hasEnemyPiece(row, col, (row - i), (col + i))){
							targets.push({
								row: (row - i),
								col: (col + i)
							});
							upRight = false;
						}
						else{
							upRight = false;
						}
					}
					else{
						upRight = false;
					}	
				}
				else{
					upRight = false;
				}
			}
			if(downLeft === true){
				if(isOnTheBoard((row + i),(col-i))){
					if(!(isFriend(row, col, (row+i), (col - i)))){		
						if(isEmpty((row + i),(col-i))){
							targets.push({
								row: (row + i),
								col: (col - i)
							});
						}
						else if(hasEnemyPiece(row, col, (row+i), (col - i))){
							targets.push({
								row: (row + i),
								col: (col - i)
							});
							downLeft = false;
						}
						else{
							downLeft = false;
						}
					}
					else{
						downLeft = false;
					}	
				}
				else{
					downLeft = false;
				}
			}
			if(upLeft === true){
				if(isOnTheBoard((row - i),(col-i))){
					if(!(isFriend(row, col, (row-i), (col - i)))){		
						if(isEmpty((row - i),(col-i))){
							targets.push({
								row: (row - i),
								col: (col - i)
							});
						}
						else if(hasEnemyPiece(row, col, (row-i), (col - i))){
							targets.push({
								row: (row - i),
								col: (col - i)
							});
							upLeft = false;
						}
						else{
							upLeft = false;
						}
					}	
					else{
						upLeft = false;
					}
				}
				else{
					upLeft = false;
				}
			}
		}	
		upRight = true;
		upLeft = true;
		downRight = true;
		downLeft = true;
		return targets;
	}	
}

function Knight(row, col, type, color){
	Piece.call(this, row, col, type, color);
	Knight.prototype.move = function(){
		$('div').removeClass("highlight");
		var row = this.row;
		var col = this.col;
		var targets = [];
		var two = [2, -2];
		var one = [1, -1];
		for(var i = 0; i < two.length; i++){
			for(var j = 0; j < one.length; j++){
				var row2 = row + two[i];
				if((isOnTheBoard(row2, (col + one[j])) && isEmpty(row2, (col + one[j])) || hasEnemyPiece(row, col, row2, (col + one[j])))){
					targets.push({
						row: (row + two[i]),
						col: (col + one[j])
					})
				}
				if(isOnTheBoard((row + one[j]), (col + two[i])) && isEmpty((row + one[j]), (col + two[i])) || hasEnemyPiece(row, col, (row + one[j]), (col + two[i]))){
					targets.push({
						row: (row + one[j]),
						col: (col + two[i])
					})
				}
			}
		}
		return targets;
	}
}

function Queen(row, col, type, color){
	//????
	Piece.call(this, row, col, type, color);
	Queen.prototype.move = function(){
		$('div').removeClass("highlight");
		var row = this.row;
		var col = this.col;
		var rookArray = Rook.prototype.move.call(this);
		var bishopArray = Bishop.prototype.move.call(this);
		var targets = [];
		targets = bishopArray.concat(rookArray);
		return targets;
	}
}


function King(row, col, type, color){
	Piece.call(this, row, col, type, color);
	this.inCheck = false;
	King.prototype.move = function(){
		$('div').removeClass("highlight");
		var row = this.row;
		var col = this.col;
		var targets = [];
		var one = [1, -1];
		for(var i = 0; i < one.length; i++){
			for(var j = 0; j < one.length; j++){
				if(isOnTheBoard((row + one[i]), col) && isEmpty((row + one[i]), col) || hasEnemyPiece(row, col, (row + one[i]), col)){
					targets.push({
						row: (row + one[i]),
						col: col
					})
				}
				if(isOnTheBoard(row, (col + one[i])) && isEmpty(row, (col + one[i])) || hasEnemyPiece(row, col, row, (col + one[i]))){
					targets.push({
						row: row,
						col: (col + one[i])
					})
				}
				if(isOnTheBoard((row + one[i]), (col + one[j])) && isEmpty((row + one[i]), (col + one[j])) || hasEnemyPiece(row, col, (row + one[i]), (col + one[j]))){
					targets.push({
						row: (row + one[i]),
						col: (col + one[j])
					})
				}
			}	
		}
		return targets;	
	}
	
}

function Pawn(row, col, type, color, firstMove){
	Piece.call(this, row, col, type, color);
	Pawn.prototype.firstMove = firstMove;
	Pawn.prototype.move = function(){
		$('div').removeClass("highlight");
		var row = this.row;
		var col = this.col;
		var targets = [];
		var one = [1, -1];
		if(this.firstMove === true){
			var firMove = [1, 2];
			if(this.color === "black"){
				if(isOnTheBoard((row + 1), col) && isEmpty((row + 1), col)){
					targets.push({
						row: (row + 1),
						col: col
					})
				if(isOnTheBoard((row + 2), col) && isEmpty((row + 2), col))
					targets.push({
						row: (row + 2),
						col: col
					})
				}
				for(var i = 0; i < one.length; i++){
					if(hasEnemyPiece(row, col, (row + 1), (col + one[i]))){
						targets.push({
							row: (row + 1),
							col: (col + one[i])
						})
					}
				}		
			}	
			else{
				if(isOnTheBoard((row - 1), col) && isEmpty((row - 1), col)){
					targets.push({
						row: (row - 1),
						col: col
					})
				if(isOnTheBoard((row - 2), col) && isEmpty((row - 2), col))	
					targets.push({
						row: (row - 2),
						col: col
					})
				}	
				for(var i = 0; i < one.length; i++){
					if(hasEnemyPiece(row, col, (row - 1), (col + one[i]))){
						targets.push({
							row: (row - 1),
							col: (col + one[i])
						})
					}
				}	
			}
		}
		else{
			if(this.color === "black"){
				if(isOnTheBoard((row + 1), col) && isEmpty((row + 1), col)){
					targets.push({
						row: (row + 1),
						col: col
					})
				}
				for(var i = 0; i < one.length; i++){
					if(hasEnemyPiece(row, col, (row + 1), (col + one[i]))){
						targets.push({
							row: (row + 1),
							col: (col + one[i])
						})
					}
				}	
			}
			else{
				if(isOnTheBoard((row - 1), col) && isEmpty((row - 1), col)){
					targets.push({
						row: (row - 1),
						col: col
					})
				}
				for(var i = 0; i < one.length; i++){
					if(hasEnemyPiece(row, col, (row - 1), (col + one[i]))){
						targets.push({
							row: (row - 1),
							col: (col + one[i])
						})
					}
				}	
			}
		}
		return targets;
	}
}

function isOnTheBoard(row, col){
	if((row < 0) || (row > 7)){
		return false;
	}
	if((col < 0) || (col > 7)){
		return false;
	}
	else{
		return true;
	}
}

function isEmpty(row, col) {
	if(!board[row]){
			return false;
	}
	else if(!board[row][col] || $.isEmptyObject(board[row][col])){
		return true;
	}
}

function dataForSquare(row, col){
	if(!board[row]){
		return null;
	}
	else{
		return board[row][col];
	}
}

function hasEnemyPiece(row, col, a, b) {
	var pieceClickedData = dataForSquare(row, col);
	var enemyPiece = dataForSquare(a, b);
	if(isEmpty(a, b)){
		return false;
	}
	else if(enemyPiece === null){
		return false;
	}
	else if ((pieceClickedData.color === "white" && enemyPiece.color === "white") || (pieceClickedData.color === "black" && enemyPiece.color === "black")) {
		return false;
	}
	else{
		return true;
	}
}

function isFriend(row, col, a, b){
	var pieceClickedData = dataForSquare(row, col);
	var enemyPiece = dataForSquare(a, b);
	if(isEmpty(a, b)){
		return false;
	}
	else if(enemyPiece === null){
		return false;
	}
	else if ((pieceClickedData.color === "white" && enemyPiece.color === "white") || (pieceClickedData.color === "black" && enemyPiece.color === "black")) {
		return true;
	}
	else{
		return false;
	}
}

function deleteMovingPiece(row, col){
	try{
		board[row][col] = {};
	} catch(e){
		debugger;
	}
}

















//check for check function:  
// run the moves of every piece on the other team every time the king moves, see if he's in check
// whenever a piece moves, run it's next move to see if they could take the king
//make giant array of piece's next move, if the king is on them, true, 





function getFriendKing() {
	var friendKing = 0;
	for(var i = 0; i < board.length; i++){
		for(var j = 0; j < board[i].length; j++){
			var currentPiece = dataForSquare(i, j);
			if(currentPiece && blackTurn === true && currentPiece.type === "king" && currentPiece.color === "black"){
				friendKing = currentPiece;
			}
			else if(currentPiece && blackTurn === false && currentPiece.type === "king" && currentPiece.color === "white"){
				friendKing = currentPiece;
			}
		}
	}
	return friendKing;
}

function enemyCheck() {
	var enemyKing = 0;
	for(var i = 0; i < board.length; i++){
		for(var j = 0; j < board[i].length; j++){
			var currentPiece = dataForSquare(i, j);
			if(currentPiece && blackTurn === true && currentPiece.type === "king" && currentPiece.color === "white"){
				enemyKing = currentPiece;
			}
			else if(currentPiece && blackTurn === false && currentPiece.type === "king" && currentPiece.color === "black"){
				enemyKing = currentPiece;
			}
		}
	}
	var possibleMoves = possibleMovesMaker();
	var isCheck = checkEnemyCheck(possibleMoves, enemyKing);
	return isCheck;
}


function possibleMovesMaker(){
	var possibleMoves = [];
	for(var t = 0; t < board.length; t++){
		for(var g = 0; g < board[t].length; g++){		
			var nowPiece = dataForSquare(t, g);
			if(nowPiece && blackTurn === false && nowPiece.color === "white"){
				var onePieceArray = nowPiece.move();
				possibleMoves = possibleMoves.concat(onePieceArray);
			}
			else if(nowPiece && blackTurn === true && nowPiece.color === "black"){
				var onePieceArray = nowPiece.move();
				possibleMoves = possibleMoves.concat(onePieceArray);
			}
		}
	}
	return possibleMoves;
}






function friendCheck(pieceClickedRow, pieceClickedCol, highlightedCellData, rowNew, colNew) {
	deleteMovingPiece(pieceClickedRow, pieceClickedCol);
	var enemyColor = blackTurn ? 'white' : 'black';
	var originalBoardData = '';
	originalBoardData = board[rowNew][colNew];
	board[rowNew][colNew] = pieceClickedData;
	var originalData = '';
	originalData = pieceClickedData;
	pieceClickedData.row = rowNew;
	pieceClickedData.col = colNew;
	var friendKing = getFriendKing();
	var result = false;
	for(var i = 0; i < board.length; i++){
		for(var j = 0; j < board[i].length; j++){
			var currentPiece = dataForSquare(i, j);
			if (currentPiece && currentPiece.color === enemyColor) {
				var onePieceArray = currentPiece.move();
				for (var o = 0; o < onePieceArray.length; o++) {
					if (onePieceArray[o].row === friendKing.row && onePieceArray[o].col === friendKing.col) {
						result =  true;
						break;
					}
				}
			}
			
		}
	}
	board[rowNew][colNew] = originalBoardData;
	pieceClickedData = originalData;
	pieceClickedData.row = pieceClickedRow;
	pieceClickedData.col = pieceClickedCol;
	board[pieceClickedRow][pieceClickedCol] = pieceClickedData;
	return result;
}



function kill(pieceClickedX, pieceClickedY, pieceClickedData, highlightedId, highlightedCellData, rowNew, colNew){   
		//empty the classes and data from highlighted square, replace it with the data and classes of pieceClicked
		highlightedCellData = pieceClickedData; 
		if(pieceClickedData.type == "pawn"){
			pieceClickedData.firstMove = false;
		}
		if(pieceClickedData.type === "king"){
			if(pieceClickedData.color === "black"){
				blackKingData = dataForSquare(rowNew, colNew);
			}
			else{
				whiteKingData = dataForSquare(rowNew, colNew);
			}
			console.log(blackKingData, whiteKingData);
		}
		highlightedCellData.row = rowNew;
		highlightedCellData.col = colNew;
		board[rowNew][colNew] = highlightedCellData;
		var pieceClasses = $("#square" + pieceClickedX + pieceClickedY).attr('class').slice(11);
		var squareColor = $("#" + highlightedId).attr('class').split(' ');
		$("#" + highlightedId).removeClass();
		$("#" + highlightedId).addClass(squareColor[0] + " " + squareColor[1]);
		$("#" + highlightedId).addClass(pieceClasses);
		var oldSquare = $("#square" + pieceClickedX + pieceClickedY).attr('class').split(' ');
		var oldSquare1st = oldSquare[0];
		var oldSquare2nd = oldSquare[1];
		$("#square" + pieceClickedX + pieceClickedY).removeClass();
		$("#square" + pieceClickedX + pieceClickedY).addClass(oldSquare1st + " " + oldSquare2nd);
		var pieceHtml = $("#square" + pieceClickedX + pieceClickedY).html();
		$("#" + highlightedId).html(pieceHtml);
		$("#square" + pieceClickedX + pieceClickedY).html('');
		$('div').removeClass("highlight");
	}


function helpMovesMaker(){
	var possibleMoves = [];
	for(var t = 0; t < board.length; t++){
		for(var g = 0; g < board[t].length; g++){		
			var nowPiece = dataForSquare(t, g);
			if(nowPiece && blackTurn === false && nowPiece.color === "black"){
				var onePieceArray = nowPiece.move();
				possibleMoves = possibleMoves.concat(onePieceArray);
			}
			else if(nowPiece && blackTurn === true && nowPiece.color === "white"){
				var onePieceArray = nowPiece.move();
				possibleMoves = possibleMoves.concat(onePieceArray);
			}
		}
	}
	return possibleMoves;
}


function checkEnemyCheck(possibleMoves, enemyKing) {
	for(var i = 0; i < possibleMoves.length; i++){
		if(possibleMoves[i].row === enemyKing.row && possibleMoves[i].col === enemyKing.col){
			enemyKing.inCheck = true;
			return true;
		}
		else{
			enemyKing.inCheck = false;
		}
	}
}



function myKingChecked(rowNew, colNew){
	var myKing = getFriendKing();
	var result = false;
	if(myKing.inCheck === true){
		var originalBoardData = '';
		originalBoardData = board[rowNew][colNew];
		deleteMovingPiece(pieceClickedRow, pieceClickedCol);
		board[rowNew][colNew] = pieceClickedData;
		var originalData = '';
		originalData = pieceClickedData;
		pieceClickedData.row = rowNew;
		pieceClickedData.col = colNew;
		var newKing = getFriendKing();
		var possibleMoves = helpMovesMaker();
		if(checkEnemyCheck(possibleMoves, newKing)){
			result = true;
		}
		board[rowNew][colNew] = originalBoardData;
		pieceClickedData = originalData;
		pieceClickedData.row = pieceClickedRow;
		pieceClickedData.col = pieceClickedCol;
		board[pieceClickedRow][pieceClickedCol] = pieceClickedData;
	}
	return result;
}



$(".square").on('click', function(event){
	 if($(this).hasClass("highlight")){	
		var ele = event.currentTarget;
		handleHighlights(ele);
	}	
	else{
		if(blackTurn === true){
			if($(this).hasClass("black")) {
				handlePieceClick(event);
			}
			else {
				return;
			}
		} 
		else {
			if($(this).hasClass("white")) {
				handlePieceClick(event);
			}
			else{
				return;
			}
		}
	}


function handleHighlights(ele){
	var highlightedId = $(ele).attr('id');
	var rowNew = Number(highlightedId.charAt(6));
	var colNew = Number(highlightedId.slice(-1));
	var highlightedCellData = dataForSquare(rowNew, colNew);
	if(myKingChecked(rowNew, colNew)){
		return;
	}
	if(friendCheck(pieceClickedRow, pieceClickedCol, highlightedCellData, rowNew, colNew)){
		return;
	}
	deleteMovingPiece(pieceClickedRow, pieceClickedCol);
	kill(pieceClickedRow, pieceClickedCol, pieceClickedData, highlightedId, highlightedCellData, rowNew, colNew);
	enemyCheck();

	blackTurn = !blackTurn;
	
}


function handlePieceClick(event){
	var el = event.currentTarget;
	var id = $(el).attr('id');
	var row = Number(id.charAt(6));
	var col = Number(id.slice(-1));
	console.log(board);
	pieceClickedData = dataForSquare(row, col);
	pieceClickedId = id;
	pieceClickedRow = row;
	pieceClickedCol = col;
	originalData = pieceClickedData;
	moveArray = pieceClickedData.move();
	pieceClickedData.highlight(moveArray);

}



});	















});