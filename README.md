# OurBooks
Progetto Tecnologie Web Universitá degli Studi di Napoli “Parthenope”

Scuola interdipartimentale delle Scienze, dell’Ingegneria e della Salute

Dipartimento di Scienze e TecnologieCorso di laurea in Informatica

## Come eseguire OurBooks

Se usiamo un IDE come PyCharm viene creata automaticamente 
una virtual environment


Altrimenti esegui questa mini-guida:

1. Attiviamo la virtual environment:

`.\venv\Scripts\activate`

2. Installiamo i requirements:

`pip install -r requirements.txt`

3. Inseriamo nella variabile d'ambiente FLASK_APP il file che avvia la web app:

`set FLASK_APP=run.py`

4. Attiviamo il debug:

`set FLASK_DEBUG=1`

5. Facciamo partire la web app:

`flask run`

Nel terminare sarà mostrato un indirizzo.
Clicchiamo sull'indirizzo e si aprirà la nostra web app "OurBooks"



Se si vuole popolare il database della nostra web app è possibile
utilizzare i file presenti nella cartella `db_books`:

1. `load.py` serve a popolare il database
2. `delete.py` serve a svuotare il database
