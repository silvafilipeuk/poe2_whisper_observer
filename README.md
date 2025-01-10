**_ Simple Path of Exile 2 Whisper Observer _**

A very simple JavaScript Node.Js whisper observer for Path of Exile 2.

The ideia is to have a command screen watching to see if you receive any whisper in the game.

Most used to receive trade request from player, it is usefull when you are working on something else on the computer while with the game open, this screen can make you aware of any trade requests.

**_ Requirements _**

- Node.Js version 18 or more.

**_ Instalation _**

- Clone de repo
- CD to the script directory.
- npm install

**_ Configuration _**

- Open poe2_whisper.js on your favourite code editor:
- Change the filePath variable with your Path of Exile 2 client.txt Path.
- Change the filterString to any value you want the script to look for. (To track whispers @From is enough).

I.E:

const filePath =
"d:/SteamLibrary/steamapps/common/Path of Exile 2/logs/client.txt"; // Replace with your Path of Exile 2 file path
const filterString = "@From"; // String to filter the message - Use @From to filter whispers

**_ Running the script _**

- node poe2_whisper.js
