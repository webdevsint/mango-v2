<p align="center"><img src="https://cdn.discordapp.com/attachments/773953073272848386/907001591159218247/video_image__2_-removebg-preview.png"></img></p>

## Mango User Documentation

**MangoDB**, the simple database.

### Installation Guide: <a name="install"></a>

Just clone the GitHub repo or dowload it from [Github](https://github.com/webdevsint/mango-v2).

```
git clone https://github.com/webdevsint/mango-v2.git
```

Extract the zip if you downloaded it. Navigate to the directory. **Open up a terminal and type the following command:**

```
npm install --save
```

Lastly you need to set some <a name="env">environment variables</a> or secrets in the **_"./.env"_** file we provided. You can find it in the root of your installation folder. Open it in any text editor an populate the empty fields. eg.

```
API_KEY=secret
KEY=encryption_key
```

And done!

**Note:** Please **don't change the "KEY" secret** if you have any documents. Doing so will render those documents undecryptable without the original key.

### Creating New Documents:

Open up a terminal in the root directory and and type the following command:

```
npm run new-doc
```

### Deleting Documents:

Open up a terminal in the root directory and and type the following command:

```
npm run delete <document-name>
```

### Starting the API server:

Navigate to your your installation folder. Open up a terminal and and type the following command:

```
npm run start
```

Your database's API should serve on [http://localhost:3000](#).

**URL structure of the database (example):** [http://localhost:3000/document/test?key=secret](#)

### Accessing Documents:

![image](https://user-images.githubusercontent.com/67751528/170007432-56d9fd2d-c272-42f7-900a-f0a099d67b91.png)

### Adding and Deleting Entries:

To add a new entry document entry just send a **POST** request with an object in the body containing your entry. eg.

![image](https://user-images.githubusercontent.com/67751528/170007882-e82d306d-0309-4b3d-859c-53a214d2ec7e.png)

Endpoint used here:
`http://localhost:3000/document/test?key=secret` **POST**

Similarly, to delete document entries just send a **DELETE** request with an additional query parameter **"index"** with the index of the entry you want to delete from the document. eg.

![image](https://user-images.githubusercontent.com/67751528/170007934-f931d9a5-c4bd-40f6-a3c6-28f327419547.png)

Endpoint used here:
`http://localhost:3000/document/test?key=secret&index=0` **DELETE**

We used [reqbin](https://reqbin.com) in our examples to send requests to the API.
