
//let orderPriceArray = []; 
let today = new Date();
let count = 0;
let priceArray = [];
let quantityArray = [];
let priceQuantity =[];
let perQuantity = 0;
let discount = false;


$(document).ready(function () {
    initialState();

    $(".card").click(function () {

        let alreadyExist = false;
        let img = $(this).find('img').attr("src");
        let pname = $(this).find('.pname').text();
        let code = $(this).find('.code').text();
        let price = $(this).find('.price').text();


        // card already exists
        let item= $(".item");
        for (let index = 0; index < item.length; index++) {
            let exist = item[index].childNodes[1].childNodes[1].innerHTML;
            if (exist == code) {
                alreadyExist = true;
                alert("Item has already exit in cart.")

            }
        }

        //card added
        if (!alreadyExist) {

            $(".calculateitem").append(
                '<div class="item">' +
                '<img src="' + img + '"alt = "" />' +
                '<div class= "itemdetail">' +
                '<p id= "pname">' + pname + '</p>' +
                '<p id= "code">' + code + '</p>' +
                '</div>' +
                '<div class="item-price">Ks' + price + '</div> ' +
                '<input type ="text" class = "num" value = "1">' +
                //'<div id="total-price"><h3>Ks' + itemsPrice + '</h3></div>' + 
                '<button class= "delete" ' + 'id="' + count + '"><ion-icon name="trash-outline"></ion-icon> </button>' +
                '</div>'
            )

             // multiple price and quantity
            priceArray.push(price);

            let q = $(".num").val();
            quantityArray.push(q);

            console.log(priceArray);
            console.log(quantityArray);

            count++;
            originalTotal();
           
            initialState();

        }

       
    });

    //for delete button
    $(document).on('click', '.delete', function () {

        priceArray[this.id] = 0;
       
        $(this).closest('.item').remove();
        originalTotal();
        
    });


    // create function quantity
    $(document). on('focus','.quantity', function () {
    perQuantity = Number ($(this).val())
    });

    $(document).on( 'blur','.quantity', function ( ) {
        let quantityItem = Number ($(this).val());

        if (quantityItem < 1 || quantityItem > 9){
          $(this).val("" + perQuantity);
            alert("Allow 1 to 9 !")
        }else{
            let index = Number ($(this).next(".delete") [0].id);
            
                quantityArray[index] = quantityItem;

            originalTotal();
         
        }

        $(document).on('change', '#addstate' , function(){
            
                originalTotal();
        });
    });


    

    //order click
    $(".order").click(function () {

        $(".orderdetail").show() 
 
        $(".orderdetail").html( 
            '<h3>Thank You' +  $("#userName").val()+ '.</h3>' + 
                '<h3> We received your order!</h3>' + 
                    '<h3>We will deliever to your place at ' + $("#userAddress").val() + '.</h3>' + 
                        '<h3>Before delivery, we will inform to you' + $("#userPh").val() + '.</h3>' 
        );

    });
});

function originalTotal() {

    let total = 0;
    let grandTotal= 0;
    let deliveryAmount = Number ($("#addstate").val());
    let discountTotal =  Number($("#discountprice").val());

    for (let i = 0; i < priceArray.length; i++) {
        let r = (quantityArray[i] * priceArray[i]);
        priceQuantity.push(r);
    }


    for (let i = 0; i < priceQuantity.length; i++) {
        let all_prices = Number(priceQuantity[i])
        total += all_prices;
    }

    document.getElementById("originaltotal").innerHTML = 'Ks' + total;

    console.log(total);

    checkWeekEnd();
   
    grandTotal  = (total - discountTotal) + deliveryAmount;
    document.getElementsByClassName("grandamount").innerHTML = grandTotal + "Ks";

}
//After clicking delivery Button

$(document).on('click', '.delivery', function () {

    $(".detitle").show();
    $(".form").show();
    $(".grandtitle").show();
    $(".grandamount").show();
    $(".order").show();
    cartInitial();
});



//For check discount
function checkWeekEnd() {
    let discountTotal= 0;

    if (today.getDay() == 0 || today.getDay() == 6) {
        if (Number(today.getHours()) >= 9 && Number(today.getHours() <= 17)) {

          
            var cost = $("#originaltotal").val(Number());
            discountTotal =  parseInt(cost * 0.15);
            $("#discountprice").text() = discountTotal + "Ks"
        }
    }else {
        $("#discountprice").val() = 0;
        }
}

//For InitialState
function initialState() {

    $(".detitle").hide();
    $(".form").hide();
    $(".grandtitle").hide();
    $(".grandamount").hide();
    $(".order").hide();
}

function cartInitial() {

    $(".item").hide();
    $("#amounttitle").hide();
    $(".dic").hide();
    $("#originaltotal").hide();
    $("#discountprice").hide();
    $(".delivery").hide();
}




