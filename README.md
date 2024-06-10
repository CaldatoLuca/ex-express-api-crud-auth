# Api CRUD Auth, JWT e Bcrypt

Implementare l' autenticazione nel progetto

- Implementare Model, Controller, Rotte e Validazioni
- Creare nuovo utente alla rotta **/auth/register** POST
- Loggare l' utente alla rotta **auth/login** POST

Proteggere le rotte tramite middleware JWT le rotte di creazione, modifica e cancellazione Post

Aggiungere la **CORS Policy** per consentire a chi decidiamo noi di leggere le nostri API, \* per tutti

### Bonus

Aggiungere relazione one-to-many tra User e Post

Creare middleware che controlla che un user possa modificare o cancellare solo i Post a lui associati, ritorna un 403

Gestire caricamento immagini post con multer
