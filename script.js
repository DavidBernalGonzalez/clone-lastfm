class Song {

    constructor(title, group, url, listeners) {
        //!Properties
        this.setSongTitle(title);
        this.setGroupName(group);
        this.setUrl(url);
        this.setListeners(listeners);

        this.setItemLi();
    }

    //! Getters
    getSongTitle() {
        return this.title;
    }

    getGroupName() {
        return this.group;
    }

    getUrl(url) {
        return this.url;
    }

    getListeners() {
        return this.listeners;
    }

    //! Setters
    setSongTitle(title) {
        this.title = title;
    }

    setGroupName(group) {
        this.group = group;
    }

    setUrl(url) {
        this.url = url;
    }

    setListeners(listeners) {
        this.listeners = listeners;
    }

    setItemLi() {
        //! Select the list UL
        const ul = document.getElementById('showData');

        //! Adding the LI item
        const newLi = document.createElement('li');
        newLi.classList.add('far', 'fa-play-circle');
        newLi.textContent = this.getSongTitle(); //? Get the songTitleData

        //! Adding the first A item
        const newAGroupName = document.createElement('a');
        newAGroupName.title = 'Ir al Grupo';
        newAGroupName.href = 'https://www.last.fm/music/Tame+Impala';
        newAGroupName.classList.add('group-name');
        newAGroupName.textContent = this.getGroupName(); //? Get the songGroupName
        newLi.appendChild(newAGroupName);

        //! Adding the second A item
        const newASongTitle = document.createElement('a');
        newASongTitle.classList.add('song-title');
        newASongTitle.textContent = this.getSongTitle(); //? Get the songGroupName
        newLi.appendChild(newASongTitle);

        //! Adding the second A item
        const newDivListeners = document.createElement('span');
        newDivListeners.classList.add('listeners');
        newDivListeners.textContent = this.getListeners(); //? Get the songGroupName
        newLi.appendChild(newDivListeners);

        //! Adding the LI in the UL list
        ul.appendChild(newLi);

        //! Adding Break Line (BR)
        const breakLine = document.createElement('br');
        ul.appendChild(breakLine);
    }

}

const loadSongs = () => {
    let fetchResponseData = '';
    let lastEvent = '';

    const init = () => {
        fetch('./music.json')
            .then(response => response.json())
            .then(data => {
                fetchResponseData = data;

                //! Data info
                console.group('Info Data Fecth');
                console.log('data is loading...');
                console.log('- Total items: ', fetchResponseData.length);
                console.log('- Typeof: ', typeof fetchResponseData);
                console.log('- Data: ', fetchResponseData);
                console.groupEnd();

                //! Loading events in buttons
                events();

                //! Call to the API data
                lastEvent = 'overview';
                loadOverview(fetchResponseData);
            })
            .catch(function (err) {
                alert(err);
            });
    }

    const clearData = () => {
        const myNode = document.getElementById("showData");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
        }
    }

    const events = () => {
        /* Events */
        document.getElementById('title').addEventListener("click", () => {
            alert('title');
        });

        document.getElementById('rock').addEventListener("click", () => {
            alert('rock');
        });

        document.getElementById('hipHop').addEventListener("click", () => {
            alert('hipHop');
        });

        document.getElementById('indie').addEventListener("click", () => {
            alert('indie');
        });

        document.getElementById('jazz').addEventListener("click", () => {
            alert('jazz');
        });

        document.getElementById('reggae').addEventListener("click", () => {
            alert('reggae');
        });

        document.getElementById('overview').addEventListener("click", () => {
            if (lastEvent != 'overview') {
                clearData();
                loadOverview(fetchResponseData);
            }
            lastEvent = 'overview';
        });

        document.getElementById('top10').addEventListener("click", () => {
            if (this.lastEvent != 'top10') {
                clearData();
                const top10 = fetchResponseData
                    .filter((i, index) => (index < 10))
                    .sort(function (a, b) { return b.listeners - a.listeners })
                    .map((item) => { return item });
                loadOverview(top10);
            }
            lastEvent = 'top10';
        });

        document.getElementById('biggest').addEventListener("click", () => {
            alert('biggest');
        });
    }

    window.onload = init;


    const loadOverview = (fetchResponseData) => {
        /* https://www.samanthaming.com/tidbits/76-converting-object-to-array/ */
        array = Object.values(fetchResponseData);
        array.forEach(songItem => {
            const objectArray = Object.entries(array);
            song = new Song(songItem.name, songItem.artist.name, songItem.url, songItem.listeners);
        });
    }

    const loadTenListened = () => {

    }

    const loadBiggest = (e) => {

    }

}


loadSongs();



