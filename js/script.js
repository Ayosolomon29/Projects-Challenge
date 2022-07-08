

const ageInDays = () => {
   var birthYear =  prompt("What year were your born?");
   var ageDays = (2022 - birthYear) * 365
   console.log(ageDays)
   document.getElementById("flex-box-result").innerHTML = `You are ${ageDays} years old in days`
}

function reset(){
    document.getElementById("flex-box-result").remove()
}
