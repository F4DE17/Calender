// When the document loads we want to populate the days labels at the top #days
let days = q("#days")

let oneDay = 1000 * 60 * 60 * 24;

for(let i = 0; i < 7; i++) {
    // 0 is always gonna be sunday
    let dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    let today = new Date(Date.now());
    let day = new Date(Date.now() + (i - today.getDay()) * oneDay)
    days.innerHTML += `<div class="day"><p class="day_name">${dayNames[i]}</p><p class="day_number">${day.getDate()}</p></div>`
}

// We want to populate the #grid with four rows of seven columns
let grid = q("#grid")

for(let i = 0; i < 4; i++) {
    grid.innerHTML += `<div class="row"></div>`
}

// For each row we want to populate it with a cell and its date
let rows = document.querySelectorAll(".row")
for(let i = 0; i < rows.length; i++) {
    let row = rows[i]
    for(let j = 0; j < 7; j++) {
        row.innerHTML += `<div class="cell"><p class="date">4</p><div>something</div></div>`
    }
}
