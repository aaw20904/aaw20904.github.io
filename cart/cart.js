/*pNode - an <ul> element*/
function NodesFabrica (pNode) {
    var parentNode = pNode;
    if (!pNode) {
     return null;
    }
    
    var callbackStock = null;

  const desktTempl = '<div data-sect-cart="src"><img src="bread01_32.jpg"></div>'+
                     '<div data-sect-cart="name">name?</div><div data-sect-cart="price">price?</div>'+
                     '<div data-sect-cart="count"><article class="btnHolder">'+
                     '<button data-btn="plus">+</button><div>3</div>'+
                     '<button data-btn="minus">-</button></article></div>'+
                     "<div data-sect-cart='total'>$50</div>"+
                      "<button data-btn='remove'>X</button>" ;   
    
 const mobTempl = '<div data-sect-cart="src"><img src="bread01_32.jpg"></div>'+
                   '<div data-sect-cart="name">?name</div>'+
                   '<div><div>Price:</div><div  data-sect-cart="price">$?</div></div>'+
                   '<div data-sect-cart="count"><div>Quantity:</div><article class="btnHolder">'+
                    "<button data-btn='plus'>+</button><div>3</div><button data-btn='minus'>-</button>"+ '</article></div><div data-sect-cart="total">'+
                    "<div>Total:</div><div class='wrpRow'><div>$50</div><button data-btn='remove'>X</button></div></div>";                   
    /*creating a desktop version by the template*/
    function createDskTopPart (templ) {
        /*create a main node*/
        var nDesk = document.createElement('div');
        nDesk.setAttribute('class','desktopVarCartItem');
        /*assign a content*/
        nDesk.insertAdjacentHTML('afterbegin',templ);
        /*return created node*/
        return nDesk;
    }
    /*creating a mobile version by the template*/
    function createMobilePart (templ) {
        /*create a main node*/
        var nMob = document.createElement('div');
        nMob.setAttribute('class','mobileVarCartItem');
        /*assign a content*/
        nMob.insertAdjacentHTML('afterbegin',templ);
        /*return created node*/
        return nMob;
    }
    /*fill info into buttons: pNode-it`s */
    function pastIdIntoBtn (pNode, id) {
        var collection;
        var tmp;
        var nodeLi;
        /*select li node*/
        nodeLi = pNode.querySelector('[data-item-id='+id+']');
        /*get collection of buttons in a <LI>*/
        collection = nodeLi.getElementsByTagName('button');
        /*convert it to an array*/
        collection = Array.prototype.slice.call(collection);
        /*iterate all the items*/
        collection.forEach( function(value,index){
            /*save attributes*/
            tmp = value.getAttribute('data-btn');
            /*assign new atr*/
            value.setAttribute('data-btn', id + '#' + tmp);
        });
    }
    /*fill info into nodes*/
    function fillInfoIntoNodes (listNode,idVal ) {
        var temp;
        var subnode;
        var keyOfItem = Object.keys(idVal)[0];
        /*get a  li node*/
        var liNode = listNode.querySelector('[data-item-id='+keyOfItem+']');
        if(!liNode){
            console.error('<li>node hasn`t been found!');
            return null;
        }
        /*get a desktop and a mobile part*/
        var desk = liNode.querySelector(".desktopVarCartItem");
        var mobile = liNode.querySelector('.mobileVarCartItem');
        /*get info about an item from a stock - a name, an image, a price */
        var infoFromStock = callbackStock(keyOfItem);
        
        /*assign count*/
        infoFromStock.count = idVal[keyOfItem];
        /*calculate sum*/
        infoFromStock.total = /[+-]?([0-9]*[.])?[0-9]+/.exec(infoFromStock.price)[0] * infoFromStock.count; 
        /*save a stock response in a variable*/
        temp = Object.assign({},infoFromStock);
        /*iterate and assign values for a desktop part*/
        for (var index in infoFromStock) {
            if (index === 'src') {
                 subnode =  desk.querySelector('[data-sect-cart=' + index + ']');
                 subnode = subnode.querySelector('img');
                 subnode.setAttribute('src',infoFromStock[index]);
             }
            /*if there is a nested block */ 
            if (index === 'count') {
                /*get a nested elem*/
                subnode = desk.querySelector('[data-sect-cart="count"]');
                subnode = subnode.querySelector('div');
                subnode.innerText = infoFromStock.count.toString() + infoFromStock.units;
                delete infoFromStock.units;
            } if ((index != 'count') && (index != 'units') && (index != 'src')) {
                /*fill data to  other nodes*/
                /*get a nested elem*/
                subnode = desk.querySelector('[data-sect-cart='+index+']');
                subnode.innerText = infoFromStock[index];
            }
            
        }
        /*restore*/
        infoFromStock = temp;
        /*iterate values for a mobile part*/
         for (var index in infoFromStock) {
             if (index === 'src') {
                 subnode =  mobile.querySelector('[data-sect-cart=' + index + ']');
                 subnode = subnode.querySelector('img');
                 subnode.setAttribute('src',infoFromStock[index]);
             }
            /*if there is a nested block */ 
            if (index === 'count') {
                /*get a nested elem*/
                subnode =  mobile.querySelector('[data-sect-cart="count"]');
                subnode = subnode.querySelector('.btnHolder');
                subnode = subnode.querySelector('div');
                subnode.innerText = infoFromStock.count.toString() + infoFromStock.units;
                delete infoFromStock.units;
            } if (index === 'total') {
                subnode = mobile.querySelector('[data-sect-cart='+index+']');
                subnode = subnode.querySelector('.wrpRow');
                subnode = subnode.querySelector('div');
                subnode.innerText = infoFromStock[index].toString();
            } 
             
             
             if ((index != 'count') && (index != 'units') && (index != 'src') &&(index != 'total')) {
                /*fill data to  other nodes*/
                /*get a nested elem*/
                subnode = mobile.querySelector('[data-sect-cart='+index+']');
                subnode.innerText = infoFromStock[index];
            }
            
        }
        pastIdIntoBtn(listNode,keyOfItem);
        
    }
    
    return{
        regStockCallback: function (f) {
            callbackStock = f;
        },
        createItemByKeyValue: function (keyV) {
              var key  = Object.keys(keyV)[0];
            if (pNode.querySelector('[data-item-id='+key+']')){
                console.error('The node has already been created!');
                return null;
            }
          
            /*create li elem*/
            var liNode = document.createElement('li');
            liNode.setAttribute('data-item-id',key);
            var mobiPart = createMobilePart(mobTempl);
            var desktPart = createDskTopPart(desktTempl);
            /*assign children*/
            liNode.appendChild(mobiPart);
            liNode.appendChild(desktPart);
            /*embed into a DOM*/
            pNode.appendChild(liNode);
            /*fill info into this node*/
            fillInfoIntoNodes(pNode, keyV);
            
        },
        removeItemFromDom: function (key) {
            var item = parentNode.querySelector('[data-item-id=' + key + ']');
            if (!item) {
                console.error('anode has`n been created');
                return null;
            }
            parentNode.removeChild(item);
        },
        setProxy: function (b) {
            var tmp;
            if (b) {
                /*hide title of list*/
                tmp = document.querySelector('.titleOfList');
                tmp.style.display = 'none';
                /*hide order button*/
                 tmp = document.querySelector('.orderSection');
                 tmp.style.display = 'none';
                /*hide list*/
                parentNode.style.display = 'none';
                /*show a proxy node - no goods*/
                tmp = document.querySelector('.noGoods');
                tmp.style.display = 'block';
            } else {
                 /*show title of list*/
                tmp = document.querySelector('.titleOfList');
                tmp.style.display = '';
                   /*show order button*/
                tmp = document.querySelector('.orderSection');
                tmp.style.display = '';
                /*show list*/
                parentNode.style.display = '';
                /*hide a proxy node - no goods*/
                tmp = document.querySelector('.noGoods');
                tmp.style.display = '';
            }
        }   
    }
}

/*event dispatcher*/
function EventDispatcher(pNode){
    var parNode = pNode;
    
    function onClick (ev) {
        
    }
}

var nodeFabrica;
function stCallback(id){
    var tmp;
    var response;
    var goodsInfo={ g0001:{name:'bread',price:'$1.25',units:'pcs',image:{src:'bread01.jpg'},keys:"bread",src:'bread01_32.jpg'},
                    g0002:{name:'bisquits',price:'$1.25',units:'Kg',image:{src:'bisc01.jpg'},keys:'bread',src:'bisc01_32.jpg'},
                    g0003:{name:'croissant',price:'$1.25',units:'pcks',image:{src:'croissant01.jpg'},keys:'bread',src:'croissant01_32.jpg'},
                    g0004:{name:'milk',price:'$1.25',units:'btl',image:{src:'milk01.jpg'},keys:'milk',src:'milk01_32.jpg'},
                    g0005:{name:'chese',price:'$1.25',units:'Kg',image:{src:'chese01.jpg'},keys:'milk',src:'chese01_32.jpg'},
                    g0006:{name:'chese(head)',price:'$1.25',units:'Pcs',image:{src:'chese-head01.jpg'},keys:'milk',src:'chese-head01_32.jpg'},
                    g0007:{name:'Vodka "Finlandia 0.7l"',price:'$1.25',units:'Btl',image:{src:'vodka01.jpg'},keys:'alcohol',src:'vodka01_32.jpg'},
                    g0008:{name:'beer Varschteiner 0.5l',price:'$1.25',units:'btl',image:{src:'beer01.jpg'},keys:'alcohol',src:'beer01.jpg'},
                    g0009:{name:'Potato',price:'$1.25',units:'Kg',image:{src:'potato01.jpg'},keys:'vegetables',src:'potato01_32.jpg'},
                    g0010:{name:'Onion',price:'$1.25',units:'Kg',image:{src:'onion01.jpg'},keys:'vegetables',src:'onion01_32.jpg'},
                    g0011:{name:'Carrots',price:'$1.25',units:'Kg',image:{src:'carrots01.jpg'},keys:'vegetables',src:'carrots01_32.jpg'},
                    g0012:{name:'sausages',price:'$1.25',units:'pcs',image:{src:'sausages01.jpg'},keys:'meat',src:'sausages01_32.jpg'},
                    g0013:{name:'pork neck',price:'$1.25',units:'Kg',image:{src:'porkneck01.jpg'},keys:'meat',src:'porkneck01_32.jpg'},
                    g0014:{name:'Hamon',price:'$1.25',units:'Kg',image:{src:'hamon01.jpg'},keys:'meat',src:'hamon01_32.jpg'},
                    g0015:{name:'sheep meat',price:'$1.25',units:'Kg',image:{src:'sheepmeat01.jpg'},keys:'meat',src:'sheepmeat01_32.jpg'},
                    g0016:{name:'apple',price:'$1.25',units:'Kg',image:{src:'apple01.jpg'},keys:"fruits",src:'apple01_32.jpg'},
                    g0017:{name:'orange',price:'$1.25',units:'Kg',image:{src:'orange01.jpg'},keys:'fruits',src:'orange01_32.jpg'},
                    g0018:{name:'pear',price:'$1.25',units:'Kg',image:{src:'pear01.jpg'},keys:'fruits',src:'pear01_32.jpg'},
                    g0019:{name:'tomato',price:'$1.25',units:'Kg',image:{src:'tomato01.jpg'},keys:'vegetables',src:'tomato01_32.jpg'},
                    g0020:{name:'butter',price:'$1.25',units:'btl',image:{src:'butter01.jpg'},keys:'milk',src:'butter01_32.jpg'},
                  };
    tmp = goodsInfo[id];
    response = Object.assign({},tmp);
    delete response.keys;
    delete response.image;
    return response;
    
}
window.onload = function () {  
    nodeFabrica = new NodesFabrica(document.querySelector('.container'));
    nodeFabrica.regStockCallback(stCallback);
    nodeFabrica.createItemByKeyValue({g0001:3});
    nodeFabrica.setProxy(true);
    nodeFabrica.setProxy(false);
}