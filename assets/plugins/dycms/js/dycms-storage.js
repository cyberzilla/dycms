/*! Copyright (c) 2018 Abu Dzakiyyah (https://abu.dzakiyyah.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 * Version: 1.0
 * ProjectName: dycms-storage.js
 */

//usage: getData({key:'yourKey'});
function getData(dycms){
    var key = dycms.key,
        debug=dycms.debug,
        jsonData = JSON.parse(localStorage[key]===undefined?null:localStorage[key]);
    if(debug!==true || debug===undefined || debug===false){
        return jsonData;
    }else{
        console.log(jsonData);
    }
}

//usage: pushData({key:'yourKey',data:[{arr1:val1},{arr2:val2}]});
function pushData(dycms){
    var key = dycms.key,
        data = dycms.data,
        replace = dycms.replace,
        debug = dycms.debug,
        jsonData = JSON.parse(localStorage[key]===undefined?JSON.stringify([]):localStorage[key]);

    if(replace!==true || replace===undefined || replace === false){
        if(data.length>1){
            jsonData = jsonData.concat(data);
        }else{
            jsonData.push(data[0]);
        }
    }else{
        jsonData = data;
    }

    if(debug!==true || debug===undefined || debug===false){
        localStorage.setItem(key,JSON.stringify(jsonData));
    }else{
        console.log(jsonData);
    }
}

//usage: findData({key:'yourKey',param:'yourParam',find:'StringToFind'});
function findData(dycms){
    var key = dycms.key,
        param = dycms.param,
        find = dycms.find,
        debug = dycms.debug,
        jsonData = JSON.parse(localStorage[key]);
    for(var i=0;i<jsonData.length;i++){
        if(find === jsonData[i][param]){
            if(debug!==true || debug===undefined || debug===false){
                return jsonData[i];
            }else{
                console.log(jsonData[i]);
            }
        }
    }
}

//usage: updateData({key:'yourKey',findParam:'yourParam',setParam:'yourParam',find:'stringToFind',setValue:'value'});
function updateData(dycms){
    var key = dycms.key,
        findParam = dycms.findParam,
        setParam = dycms.setParam,
        find = dycms.find,
        setValue = dycms.setValue,
        replace = dycms.replace,
        debug = dycms.debug,
        jsonData = JSON.parse(localStorage[key]);

    for (var i = 0; i < jsonData.length; i++) {
        if(replace!==true || replace===undefined || replace===false) {
            if (find === jsonData[i][findParam]) {
                jsonData[i][setParam] = setValue;
            }
        }else{
            jsonData[i][setParam] = setValue;
        }
    }



    if(debug!==true || debug===undefined || debug===false){
        localStorage.setItem(key,JSON.stringify(jsonData));
    }else{
        console.log(jsonData);
    }
}

//usage: changeData({key:'yourKey',findParam:'yourParam',setParam:'yourParam',find:'stringToFind',setValue:'if_true:if_false'});
function changeData(dycms){
    var key = dycms.key,
        findParam = dycms.findParam,
        setParam = dycms.setParam,
        find = dycms.find,
        setValue = dycms.setValue,
        debug = dycms.debug,
        jsonData = JSON.parse(localStorage[key]);
    for (var i = 0; i < jsonData.length; i++) {
        var arrValue = setValue.split(":");
        if( find === jsonData[i][findParam]){
            jsonData[i][setParam] = arrValue[0];
        }else{
            jsonData[i][setParam] = arrValue[1];
        }
    }
    if(debug!==true || debug===undefined || debug===false){
        localStorage.setItem(key,JSON.stringify(jsonData));
    }else{
        console.log(jsonData);
    }
}

//usage: deleteData({key:'yourKey',param:'yourParam',find:'stringToFind'});
function deleteData(dycms){
    var key = dycms.key,
        param = dycms.param,
        find = dycms.find,
        debug = dycms.debug,
        jsonData = JSON.parse(localStorage[key]===undefined?JSON.stringify([]):localStorage[key]),
        jsonFilter = jsonData.filter(function(item) {
            return item[param] !== find;
        });

    if(debug!==true || debug===undefined || debug===false){
        localStorage.setItem(key,JSON.stringify(jsonFilter));
    }else{
        console.log(jsonFilter);
    }
}

//usage: deleteKey({key:'yourKey'});
function deleteKey(dycms) {
    var key = dycms.key;
    localStorage.removeItem(key);
}

//usage: destroyStorage(); //be carefull using this function
function destroyStorage(){
    localStorage.clear();
}