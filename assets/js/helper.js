"use strict";

/****************
 Storage helpers
 ***************/

function saveToStorage(key, value) {
    if (localStorage) {
        return localStorage.setItem(key,JSON.stringify(value));
    }
}

// Returns null if not set
function loadFromStorage(key) {
    if (localStorage) {
        return JSON.parse(localStorage.getItem(key));
    }
}


/*******************
 Conversion helpers
 ******************/

function nameToImageOrID(name){
    name = name.replaceAll(" ", "-");
    name = name.replaceAll("/", "-47-");
    return name.toLowerCase();
}

function idToName(id, deleteLocation){
    id = id.replaceAll("-47-", "/");
    id = id.replaceAll("-", " ");

    if(deleteLocation === true){
        id = deleteLocationOfId(id);
    }

    return id;
}

// Add additional functions below
function loadExistingArrayFromStorageOrCreateNewArray(key){
    let submittedArrayLocalStorage = loadFromStorage(key);

    if (submittedArrayLocalStorage == null){
        submittedArrayLocalStorage = [];
    }

    return submittedArrayLocalStorage;
}

function loadFromMemoryOrLocalStorage(key){
    let submittedDisastersLocalStorage = loadFromStorage(key);

    if (submittedDisastersLocalStorage == null){
        submittedDisastersLocalStorage = submittedDisasters;
    }

    return submittedDisastersLocalStorage;
}

function saveToLocalStorageOrToMemory(array){
    const checkLocalStorageArrayExists = loadFromStorage(config.submittedDisastersKey);
    if(checkLocalStorageArrayExists == null){
        submittedDisasters = array;
    }
    else{
        saveToStorage(config.submittedDisastersKey, array);
    }
}

function deleteLocationOfId(id){
    const indexLastSpace = id.lastIndexOf(" ");
    id = id.substring(0, indexLastSpace);

    return doubleCheckDisasterName(id);
}

function doubleCheckDisasterName(disasterName){
    const disasterObject = selectObject(loadFromMemoryOrLocalStorage(config.submittedDisastersKey), disasterName);

    if(disasterObject === undefined){
        return idToName(disasterName, true);
    }
    else{
        return disasterName;
    }
}

function idToCountry(id){
    id = id.replaceAll("-47-", "/");
    id = id.replaceAll("-", " ");
    id = id.substring(id.indexOf(" ") + 1);

    if(countries.map(country => country.toLowerCase()).includes(id.toLowerCase()) === false){
        id = idToCountry(id);
    }

    return id;
}

function selectObject(array, selectedElement, selectedCountry=undefined){
    for (const element of array){
        if (element.name.toLowerCase() === selectedElement.toLowerCase()){
            if(selectedCountry !== undefined){
                if(element.location.toLowerCase() === selectedCountry.toLowerCase()){
                    return element;
                }
            }
            else{
                return element;
            }
        }
    }
}