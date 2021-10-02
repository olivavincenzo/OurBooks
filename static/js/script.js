var cartCount = 0,
    totPrice=0;
    let array_books = [];


 $("#button_Cart").on("click", function() {

    $(".container_cart_drop_down").fadeToggle( "fast");
      document.getElementById("container_cart_drop_down").classList.add('visible')
    document.getElementById("container_scroll_cart").classList.add('visible')

  });



 // FUNZIONE PER EFFETTUARE IL LOGIN
$("#submit").on("click", function() {

    nome= $('#user').val()
    pass= $('#password').val()

    let token = btoa(nome + ":" + pass);

    function setHeader(xhr) {
        if (token != null) {
            xhr.setRequestHeader('Authorization', "Basic " + token);
        }
    }

    $.ajax
    ({
        type: "GET",
        url: "https://api.uniparthenope.it/UniparthenopeApp/v1/login",
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        processData : false,
        beforeSend: setHeader,
        success: function(response) {
            var name = response["user"]["firstName"];
            var surname= response["user"]["lastName"];
 
            $.getJSON({
                url: "/getData",
                data: { Name: name, Surname: surname},
                success: function(data){
                    window.location.replace("/buy")
                }
            });
        },
        error: function(xhr, status, error) {alert('Errore!')}
    });

});


// CARICARE LIBRI NELLA SEZIONE COMPRA
function loadBooks(){
    let cnt_books = 1;
    var select = document.getElementById('exam_selector');
    var text = select.options[select.selectedIndex].text;

    $.ajax({
        url: "/loadBooks",
        type: 'POST',
        data: {
            exam: text,
        },
        success: function(resp){
            document.getElementById("container_books").innerText= ''
            let query_book = resp['books']


             for (let i = query_book.length - 1; i >= 0; i--) {
                let tmp_book = query_book[i]
                cnt_books++;
                

                let container_books = document.getElementById('container_books')
                let tmp_name = tmp_book['nome']
                let tmp_id= tmp_book['_id']
                let tmp_exam = tmp_book['esame']
                let tmp_price= tmp_book['prezzo']
                let tmp_img= tmp_book['img']
                let tmp_condition = tmp_book['condizione']
                let tmp_seller= tmp_book['venditore']
                let tmp_id_name = 'libro_' + tmp_name + '_name'


                let new_book
                let new_book_name
                let new_book_exam
                let new_book_input
                let new_book_img
                let new_book_price
                let new_book_seller
                let new_book_condition

                new_book = document.createElement("div")
                new_book.classList.add('product')

                new_book_img = document.createElement("div")
                new_book_img.classList.add('img_shadow')
                var nome_img = "url('../static/images/" + tmp_img + "')";
                new_book_img.style.backgroundImage= nome_img;


                new_book_price = document.createElement("h3")
                new_book_price.classList.add('price')
                 if(tmp_price[tmp_price.length-1] != '€')
                     tmp_price= tmp_price
                new_book_price.innerText = "Prezzo: " + tmp_price + "€"

                new_book_seller = document.createElement("h3")
                new_book_seller.classList.add('seller')
                new_book_seller.innerText = "Venditore: " + tmp_seller

                new_book_condition = document.createElement("h3")
                new_book_condition.classList.add('condition')
                new_book_condition.innerText = "Condizione: " +tmp_condition

                new_book_name = document.createElement("h3")
                new_book_name.classList.add('title')
                new_book_name.id = tmp_id_name
                new_book_name.innerText = tmp_name



                new_book_exam = document.createElement("h3")
                new_book_exam.classList.add('exam')
                new_book_exam.innerText = 'Esame: ' + tmp_exam

                new_book_input = document.createElement("div")
                new_book_input.classList.add('button')
                new_book_input.type = 'button'
                new_book_input.value = 'Aggiungi'
                new_book_input.id= tmp_id;
                new_book_input.innerText = 'Add to cart'
                new_book_input.addEventListener('click', function () {
                    addTocart(tmp_id,tmp_name,tmp_img,tmp_exam,tmp_price,tmp_condition,tmp_seller)
                });

                new_book.appendChild(new_book_img)
                new_book.appendChild(new_book_name)
                new_book.appendChild(new_book_exam)
                new_book.appendChild(new_book_condition)
                new_book.appendChild(new_book_seller)
                new_book.appendChild(new_book_price)
                new_book.appendChild(new_book_input)

                container_books.appendChild(new_book)
            }

        },
        error: function(){
            console.log('Error in loadBook.')
        }
    });

};



function isNumeric(str) {
  if (typeof str != "string") return false
  return !isNaN(str) && !isNaN(parseFloat(str))
}

// INSERIRE LIBRO NEL DATABASE
function insertBook(){

    name_book= $('#name_book_create').val()

    var select_condition = document.getElementById('condition_book_create');
    condition_book= select_condition.options[select_condition.selectedIndex].text;

    price_book= $('#price_book_create').val()

    var select = document.getElementById('exam_selector');
    exam_book= select.options[select.selectedIndex].text;

    img_books= $('#image_book_create').val(),
    img_books= img_books.substr(12,img_books.length)

    if (isNumeric(price_book) && parseFloat(price_book)>0 && name_book.length>0 && condition_book.length>0 && exam_book.length>0 && img_books.length>0){

        $.ajax({
        url: "/createBook",
        type: 'POST',
        data: {
            Name_book: name_book,
            Condition_book: condition_book,
            Price_book: price_book,
            Exam_book: exam_book,
            Img_book: img_books
        },
        success: function(){
            console.log("Succes insertBook")
            loadSeller()
        },
        error: function(){
            console.log('Error insertBook')
        }
    });
    }else{
        alert("Campi Errati!")

    }





}



// CARICARE I LIBRI NELLA SEZIONE VENDITA
function loadSeller(){

    $.ajax({
        url: "/loadsellerBooks",
        type: 'POST',
        data: {},
        success: function(resp){
            document.getElementById("container_seller_book").innerText= ''
            let query_book = resp['books']

            for (let i = query_book.length - 1; i >= 0; i--) {
                let tmp_book = query_book[i]
                

                let container_books = document.getElementById('container_seller_book')


                let tmp_id = tmp_book['_id']
                let tmp_name = tmp_book['nome']
                let tmp_img = tmp_book['img']
                let tmp_exam = tmp_book['esame']
                let tmp_price = tmp_book['prezzo']
                let tmp_condition = tmp_book['condizione']
                let tmp_seller = tmp_book['venditore']

                let tmp_id_name = 'libro_' + tmp_name + '_name'

                let new_book
                let new_book_name
                let new_book_exam
                let new_book_img
                let new_book_price
                let new_book_seller
                let new_book_condition

                new_book = document.createElement("div")
                new_book.classList.add('product')

                new_book_img = document.createElement("div")
                new_book_img.classList.add('img_shadow')
                var nome_img = "url('../static/images/" + tmp_img + "')";
                new_book_img.style.backgroundImage = nome_img;


                new_book_price = document.createElement("h3")
                new_book_price.classList.add('price')
                if (tmp_price[tmp_price.length - 1] != '€')
                    tmp_price = tmp_price
                new_book_price.innerText = "Prezzo: " + tmp_price + "€"


                new_book_seller = document.createElement("h3")
                new_book_seller.classList.add('seller')
                new_book_seller.innerText = "Venditore: " + tmp_seller

                new_book_condition = document.createElement("h3")
                new_book_condition.classList.add('condition')
                new_book_condition.innerText = "Condizione: " + tmp_condition


                new_book_name = document.createElement("h3")
                new_book_name.classList.add('title')
                new_book_name.id = tmp_id_name
                new_book_name.innerText = tmp_name

                new_book_exam = document.createElement("h3")
                new_book_exam.classList.add('exam')
                new_book_exam.id = tmp_exam
                new_book_exam.innerText = 'esame: ' + tmp_exam



                new_book.appendChild(new_book_img)
                new_book.appendChild(new_book_name)
                new_book.appendChild(new_book_exam)
                new_book.appendChild(new_book_condition)
                new_book.appendChild(new_book_seller)
                new_book.appendChild(new_book_price)
 

                container_books.appendChild(new_book)
            }
        },
error: function(xhr, status, error) {
  alert(xhr.responseText);
}
    });

};



// CARICARE GLI ORDINI
function loadOrder(){
    $.ajax({
        url: "/LoadOrder",
        type: 'POST',
        success: function(resp){
            let tmp = resp['orders']

             for (let i = tmp.length - 1; i >= 0; i--) {
                 let order = tmp[i]

                 let container_single_order
                 let name_order
                 let containerOrder = document.getElementById('content_order')

                 container_single_order = document.createElement('div')
                 container_single_order.classList.add('order')

                 name_order= document.createElement('p')
                 name_order.setAttribute('style', 'white-space: pre;')
                 for(let j= order['libro'].length -1; j>=0; j--){
                     name_order.textContent +=  order['libro'][j] +"\r"
                 }


                 name_order.textContent += "\n\rTotale: " +  order['prezzo'] +"€\n\n\r"
                 name_order.textContent +=  "Data di acquisto: " + order['data'] +"\r\n"

                 container_single_order.appendChild(name_order)
                 containerOrder.appendChild(container_single_order)
             }
        }
    });
}


// AGGIUNGERE ELEMENTI NEL CARRELLO

function addTocart (id,name,img,exam,price,condition,seller){
    let x = getIndex(id)
    if(x < 0){

        cartCount++;
        document.getElementById("button_buy").className="button_buy"
        document.getElementById("cart_total").className="cart_total"
        document.getElementById(id).className="button_add_onclick"
        document.getElementById(id).innerText= "Aggiunto"
        document.getElementById('number_items_cart').innerText= cartCount;

        let list = document.getElementById('container_scroll_cart')
        let cartLength = array_books.length

        array_books[cartLength] = new arrayBooks(id,name,img,exam,price,condition,seller)

        let item
        let item_name
        let item_seller
        let item_condition
        let item_price
        let item_delete
        let item_row


        item_row= document.createElement("div")
        item_row.classList.add('row_cart')
        item_row.id= "riga"+cartCount


        item = document.createElement("div")
        item.classList.add('row_cart_left')

        item_name= document.createElement("p")
        item_name.classList.add('name_cart')

        item_seller = document.createElement("p")
        item_seller.classList.add('seller_cart')

        item_condition = document.createElement("p")
        item_condition.classList.add('condition_Cart')

        item_price = document.createElement("p")
        item_price.classList.add('price_cart')

        item_delete=document.createElement("div")
        item_delete.classList.add('button_delete_book')
        item_delete.addEventListener('click', function () {
            deleteBook(item_row.id,id,price)
        });


        item_name.innerText = name
        item_seller.innerText = "Venditore: " + seller
        item_condition.innerText = "Condizione: " + condition
        item_price.innerText = "Prezzo: " + price + "€"

        item.appendChild(item_name)
        item.appendChild(item_seller)
        item.appendChild(item_condition)
        item.appendChild(item_price)
        item_row.appendChild(item)
        item_row.appendChild(item_delete)
        list.appendChild(item_row)


        totPrice = parseFloat(totPrice) + parseFloat(price)
        document.getElementById("cart_total").innerText= totPrice + '€'
    }
}


function arrayBooks(id,name,img,exam,price,condition,seller){
    this.id = id;
    this.name = name;
    this.img = img;
    this.exam = exam;
    this.seller = seller;
    this.condition = condition;
    this.price = price;
}





// restituisce indice del libro nell' array carrello
function getIndex(id){
    for(let i in array_books){
        if(array_books[i].id === id)
            return i
    }
    return -1
}

// CANCELLARE LIBRI DAL CARRELLO
function deleteBook(item_row_id,id,price){
    var item = document.getElementById(item_row_id)
    item.parentNode.removeChild(item)

    id_canc=getIndex(item_row_id)
    array_books.splice(id_canc, 1)

    totPrice= totPrice - parseFloat(price)
    document.getElementById("cart_total").innerText= totPrice + "€"

    document.getElementById(id).className="button"
    document.getElementById(id).innerText= "Add to cart"

    cartCount=cartCount-1;
    document.getElementById('number_items_cart').innerText= cartCount;
}

// COMPLETAMENTO ORDINE
function orderCompleted(){

    $.ajax({
        url: "/insertOrder",
        type: 'POST',
        data: JSON.stringify(array_books),
        contentType: 'application/json',
        success: function(){
            /*AFTER CREATE THE ORDER REFRESH THE BILL*/
            console.log("Success in ORDER")
            dropAllproduct()
        },
        error: function(){
            console.log('Error in ORDER.')

        }
    });

}

// CANCELLARE ELEMENTI DAL CARELLO UNA VOLTA EFFETTUATO L'ORDINE
function dropAllproduct(){

    const cart_delete = document.querySelector('#container_scroll_cart');

    while (cart_delete.firstChild) {
        array_books.splice(0, 1);
        cart_delete.removeChild(cart_delete.firstChild);
    }

    cartCount=0;
    document.getElementById('number_items_cart').innerText= cartCount;

    totPrice=0
    document.getElementById("cart_total").innerText=''
    loadBooks()
}


