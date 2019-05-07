let form = document.querySelector(".calc");
let paymentTable = document.querySelector(".paymentTable tbody");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputs = {
        price: Number(document.querySelector("#price").value),
        month: Number(document.querySelector("#month").value),
        monthlyPerc: Number(document.querySelector("#monthlyPerc").value),

    };

    let totalPrice = inputs.price + (inputs.price * (inputs.month * inputs.monthlyPerc) / 100);
    let monthlyPay = totalPrice / inputs.month;
    let partPay = monthlyPay % 1;
    monthlyPay -= partPay;

    partPay = Math.ceil(partPay * inputs.month);
    totalPrice = Math.ceil(totalPrice);
    document.querySelector(".toplamMebleg").innerText = totalPrice+" AZN";
    let date = new Date();
    date.setMonth(date.getMonth() + 1);

    emptyPaymentTable();
    for (let index = 0; index < inputs.month; index++) {
        
        if (index + 1 == inputs.month) {
            monthlyPay += partPay;
        }
        totalPrice -= monthlyPay;
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${index+1}</td>`;
        tr.innerHTML += `<td>${formatDate(date)}</td>`;
        tr.innerHTML += `<td>${monthlyPay} azn</td>`;
        tr.innerHTML += `<td>${totalPrice}</td>`;
        paymentTable.append(tr);
        date.setMonth(date.getMonth() + 1);
        


    }
});


function formatDate(date) {
    let r = "";
    if (date.getDate() < 10) {
        r += "0" + date.getDate();
    } else {
        r += date.getDate();
    }
    r += ".";
    if (date.getMonth() + 1 < 10) {
        r += "0" + (date.getMonth() + 1)
    } else {
        r += date.getMonth() + 1;
    }
    r += "." + date.getFullYear();
    return r;
}

function emptyPaymentTable() {
    //1ci variant
    // let tbody = document.querySelector(".paymentTable tbody ");
    // tbody.innerHTML = "";


    //2ci variant

    let items=document.querySelectorAll(".paymentTable tbody tr")
    for (let i = 0; i < items.length; i++) {
        items[i].remove();


}}