<p align="center"><img src="https://cdn.discordapp.com/attachments/773953073272848386/907001591159218247/video_image__2_-removebg-preview.png"></img></p>

## Mango User Documentation

**MangoDB**, the simple database.

### Installation Guide: <a name="install"></a>
Just clone the GitHub repo or dowload it from [Github](https://github.com/webdevsint/mango-v2).
```
git clone -b <branch name> https://github.com/webdevsint/mango-v2.git
```

Extract the zip if you downloaded it. Navigate to the directory. **Open up a terminal and type the following command:**
```
npm install --save
```
We're not done just yet. Lastly you need to set some <a name="env">environment variables</a> or secrets in the **_"./.env"_** file we provided. You can find it in the root of your installation folder. Open it in any text editor an populate the empty fields. eg.
```
API_KEY=secret
KEY=encryption_key
```
And done!

**Note:** Make sure your secret values are secure. Do not share them to anyone. Please **don't change the "KEY" secret** if you have any documents. Doing so will make those documents inaccessible without the original key.