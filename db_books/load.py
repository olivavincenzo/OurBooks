from run import db, Book
import uuid

book_db = [

    {"_id": uuid.uuid4().hex, "nome": "Matematica 1", "img": "MAT1.png", "esame": "Matematica 1", "prezzo": "35", "condizione":"Ottme", "venditore": "VINCENZO OLIVA"},
    {"_id": uuid.uuid4().hex, "nome": "Matematica 1", "img": "MAT1.png", "esame": "Matematica 1", "prezzo": "40","condizione": "Come nuovo", "venditore": "FRANCESCO NAPOLITANO"},
    {"_id": uuid.uuid4().hex, "nome": "Matematica 1", "img": "MAT1.png", "esame": "Matematica 1", "prezzo": "25","condizione": "Accettabili", "venditore": "SALVATORE VILLANO"},
    {"_id": uuid.uuid4().hex, "nome": "Matematica 1", "img": "MAT1.png", "esame": "Matematica 1", "prezzo": "30","condizione": "Buone", "venditore": "SALVATORE ARGENZIANO"},

    {"_id": uuid.uuid4().hex, "nome": "Elementi di Analisi Matematica 2", "img": "MAT2.png", "esame": "Matematica 2", "prezzo": "24","condizione": "Accettabili", "venditore": "VINCENZO OLIVA"},
    {"_id": uuid.uuid4().hex, "nome": "Elementi di Analisi Matematica 2", "img": "MAT2.png", "esame": "Matematica 2", "prezzo": "26","condizione": "Buone", "venditore": "FRANCESCO NAPOLITANO"},
    {"_id": uuid.uuid4().hex, "nome": "Elementi di Analisi Matematica 2", "img": "MAT2.png", "esame": "Matematica 2", "prezzo": "30","condizione": "Ottime", "venditore": "SALVATORE VILLANO"},
    {"_id": uuid.uuid4().hex, "nome": "Elementi di Analisi Matematica 2", "img": "MAT2.png", "esame": "Matematica 2", "prezzo": "34", "condizione":"Come nuovo", "venditore": "SALVATORE ARGENZIANO"},


    {"_id": uuid.uuid4().hex, "nome": "Programmazione 1", "img": "PROG1.png", "esame": "Programmazione 1", "prezzo": "33", "condizione":"Ottime", "venditore": "SALVATORE VILLANO"},
    {"_id": uuid.uuid4().hex, "nome": "Programmazione 1", "img": "PROG1.png", "esame": "Programmazione 1", "prezzo": "30","condizione": "Buone", "venditore": "FRANCESCO NAPOLITANO"},
    {"_id": uuid.uuid4().hex, "nome": "Programmazione 1", "img": "PROG.png1", "esame": "Programmazione 1", "prezzo": "29","condizione": "Buone", "venditore": "SALVATORE ARGENZIANO"},


    {"_id": uuid.uuid4().hex, "nome": "Algoritmi e strutture dati","img": "ASD.png", "esame": "Algoritmi e strutture dati", "prezzo": "40", "condizione":"Buone", "venditore": "VINCENZO OLIVA"},
    {"_id": uuid.uuid4().hex, "nome": "Sistemi Operativi","img": "SO.png", "esame": "Sistemi Operativi", "prezzo": "44", "condizione":"Buone", "venditore": "FRANCESCO NAPOLITANO"},
     {"_id": uuid.uuid4().hex, "nome": "Sistemi Operativi", "img": "SO.png", "esame": "Sistemi Operativi", "prezzo": "33","condizione": "Accettabili", "venditore": "SALVATORE ARGENZIANO"},
]


add_book = Book.insert_many(book_db)

print("Elementi inseriti: " + str(len(add_book.inserted_ids)))
