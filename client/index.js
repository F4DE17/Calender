q("button").onclick = function() {
    DB.read("users", {where: {id: 1}})
}