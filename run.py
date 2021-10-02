from flask import Flask, render_template, request, redirect, jsonify, url_for, session, json
from flask_cors import CORS
from templates.user import user
from datetime import datetime
from pymongo import MongoClient
import uuid




client = MongoClient("mongodb://localhost:27017/")
db = client["OurBooks"]

Book = db["book"]

app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def login():
    return render_template("login.html")

@app.route('/logout')
def logout():
    return redirect(url_for('login'))


@app.route('/buy' , methods=['POST', 'GET'])
def buy():
    return render_template('buy.html', page= "buy")

@app.route('/sale' , methods=['POST', 'GET'])
def sale():
    return render_template('sale.html', page="sale")

@app.route('/LoadOrder', methods=['POST', 'GET'])
def loadOrder():
    if request.method == 'POST':
            nameusername = user.name + " " + user.surname
            orders = db.insertOrder.find({'utente': nameusername})
            if orders:
                result = {
                    'orders': list(orders)
                }
                return jsonify(result)
            return render_template('order.html')
    return render_template('order.html', page="order")





@app.route("/getData", methods = ['POST', 'GET'])
def getData():
    json_data = request.json
    user.name= request.args.get('Name')
    user.surname= request.args.get('Surname')

    results = {'processed': 'true'}
    return jsonify(results)


@app.route('/loadBooks', methods=['GET', 'POST'])
def loadBooks():
    if request.method == 'POST':
        nameusername= user.name + " " + user.surname

        book_query = Book.find({'venditore': {"$not": {"$eq": nameusername }} ,'esame': request.form['exam'] })

        if book_query:
            result = {
                        'books': list(book_query),
            }
            return jsonify(result)
        else:
            return render_template('buy.html')
    return render_template('buy.html')

@app.route('/createBook', methods=['POST', 'GET'])
def createBook():
    if request.method == 'POST':
        data = request.form
        name = data['Name_book']
        condition = data['Condition_book']
        price = data['Price_book']
        exam =  data['Exam_book']
        img = data['Img_book']


        nameusername = user.name + " " + user.surname

        Book.insert_one({'_id': uuid.uuid4().hex,
                         'nome': name,
                         'img': img,
                         'esame': exam,
                         'prezzo': price,
                         'condizione': condition,
                         'venditore': nameusername
                         })

        return render_template('sale.html')
    return render_template('sale.html')


@app.route('/loadsellerBooks', methods=['GET', 'POST'])
def loadsellerBooks():
    nameusername = user.name + " " + user.surname
    if request.method == 'POST':
        book_query = Book.find({'venditore': nameusername })
        if book_query:
            result = {
                        'books': list(book_query),
            }
            return jsonify(result)
        else:
            return render_template('sale.html')
    return render_template('sale.html')





@app.route('/insertOrder', methods=['POST', 'GET'])
def insertOrder():
    if request.method == 'POST':

        total_price = 0
        data = request.get_json()
        order = []
        for element in data:

            Book.delete_one({'_id': element['id']})
            current_price = element['price']

            total_price = total_price + float(current_price)
            tmp_books = element['name']  + ' [' + str(element['price']) + '€ ]' +  "    Condizioni: " + element['condition']     + "    Venduto da: " + element['seller']+ '\n'
            order.append(tmp_books)

        nameusurname= user.name + " " + user.surname

        order_date = datetime.today().strftime('%d-%m-%y    Alle ore: %H:%M:%S')

        db.insertOrder.insert_one({'_id': uuid.uuid4().hex, 'data': order_date, 'libro': order, 'utente': nameusurname, 'data': order_date, 'prezzo': total_price})

        return render_template('buy.html')

    return render_template('buy.html')




if __name__ == '__main__':
    app.run(port=5019,debug=True)