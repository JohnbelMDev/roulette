let button = document.querySelector('button')
let bet = document.querySelector('input').value

let playerWins = 0
let playerLoses = 0
let amount = 0


let betMoney = document.getElementById('betMoney')

button.addEventListener('click', play)

function play() {

  if (parseInt(betMoney.innerHTML) < document.getElementById('betId').value) {
    alert("good bye")
  }
  else {

   // let moneyRoulete = document.getElementById('#moneyRoulete').value
   // console.log("hell there moneyroulete" + moneyRoulete);
  // if (moneyRoulete <= 0) {
  // alert("You have lost ")
  // }
  // console.log("fhell there" + );
  bet = document.querySelector('input').value
  //console.log("hello I am bet " + bet)
  if (bet) {
    fetch(`/randomize`)
      .then(response => response.json())
      .then((result) => {
        console.log(result);
        winResult(result)
      });
  }
}
  // console.log("hello I am amount " + amount);
}

//======This Function displays the win or loss message======//
function displayCompleteMessage(msg) {
  document.getElementById("result").innerHTML = msg;
}

// this function keeps tracks of when the player loses
function winResult(result) {
  let bet = document.querySelector('input').value


  if (result === 'win') {

    amount = parseInt(amount) + parseInt(bet)

    document.getElementById('betMoney').innerHTML = amount

    playerWins++
    document.getElementById("playerWins").innerHTML = playerWins;
    displayCompleteMessage("You won");

    update()

  }

  else {
    amount = parseInt(amount) - parseInt(bet)
    document.getElementById('betMoney').innerHTML = amount
    playerLoses++
    document.getElementById("playerLoses").innerHTML = playerLoses;
    displayCompleteMessage("You Lost");
    update()
  }
}




function update() {
  fetch('/updateDatabase', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': "playerOne",
      'playwinTotal': document.getElementById("playerWins").innerHTML,
      'playerloseTotal': document.getElementById("playerLoses").innerHTML,
      'money': document.getElementById('betMoney').innerHTML
    })
  })

}
