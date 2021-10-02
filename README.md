# OurBooks
## Come eseguire OurBooks

Se usiamo un IDE come PyCharm viene creata automaticamente 
una virtual environment


Altrimenti esegui questa mini-guida:

1. Attiviamo la virtual environment:

`.\venv\Scripts\activate`

2. Attivata la virtual environment installiamo i requirements:

`pip install -r requirements.txt`

3. Inseriamo nella variabile d'ambiente FLASK_APP il file che avvia la web app:

`set FLASK_APP=run.py`

4. Attiviamo il debug:

`set FLASK_DEBUG=1`

5. Facciamo partire la web app:

`flask run`

Nel terminare sarà mostrato un indirizzo.
Clicchiamo sull'indizizzo e si aprira la nostra web app "OurBooks"



Se si vuole popolare il database della nostra web app è possibile
utilizzare i file presenti nella cartella `db_books`:

1. `load.py` serve a popolare il database
2. `delete.py` serve a svuotare il database
