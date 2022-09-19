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


const getFromLS = function(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if(selectedSeats != null && selectedSeats.length>0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex;
    }
}


const saveToLS = function(indexes){
    localStorage.setItem("selectedSeats", JSON.stringify(indexes));
    localStorage.setItem("selectedMovieIndex" , select.selectedIndex);
}


getFromLS();
calculateTotal();