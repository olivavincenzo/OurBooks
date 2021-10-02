from run import db,Books

result_book = Book.find()
result_book = Book.delete_many({})

result_order= db.insertOrder.find()
result_order= db.insertOrder.delete_many({})

print("Elementi cancellati: " + str(result_book.deleted_count) )
print("Ordini cancellati: " + str(result_order.deleted_count) )
