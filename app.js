const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");




container.addEventListener("click", function(e){
    if(e.target.classList.contains("seat") && !e.target.classList.contains("reserved")){
        e.target.classList.toggle("selected");
        calculateTotal();        
    }
});

select.addEventListener("change", (e)=>{
    calculateTotal();        

})

const calculateTotal = function(){
    const selectedSeats = container.querySelectorAll(".seat.selected");

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach((seat) => selectedSeatsArr.push(seat));
    seats.forEach((s) => seatsArr.push(s));

    let selectedSeatIndexes = selectedSeatsArr.map((s) => {
        return seatsArr.indexOf(s)
    })

     let selectedSeatCount = selectedSeats.length;
     let price = select.value;
     count.innerText = selectedSeatCount;
     amount.innerText = ` ${selectedSeatCount * price}$`;

     saveToLS(selectedSeatIndexes);
}

const saveToLS = function(indexes){
    localStorage.setItem("selectedSeats", JSON.stringify(indexes));
    localStorage.setItem("selectedMovieIndex" , select.selectedIndex);
}