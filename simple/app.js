var obj = {}
Object.defineProperty(obj, "data", {
    get: function () {
        console.log("get")
    },
    set: function (newValue) {
        document.getElementById("message").value = newValue
        document.getElementById("msg").innerText = newValue
    }
})
document.getElementById("message").addEventListener('keyup', function () {
    obj.data = event.target.value
}) 