q("button").onclick = function() {
    DB.read("users", row:{where: {id: 1}})
}