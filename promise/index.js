class Vendor {
    #itemlist;

    #noItemCallback;

    #itemCallback;

    set noItemCallBack(value){
        this.#noItemCallback = value
    }

    set itemCallback(value){
        this.#itemCallback = value;
    }

    constructor(itemList){
        this.#itemlist = itemList;
    }

    sellSomething(){
        if(this.#itemlist.length === 0){
            this.#noItemCallback("Nincs eladni való termék")
        }else{
            this.#itemCallback(this.#itemlist.pop())
        }
    }

    sellSomethingPromise(){
        return new Promise((resolve, reject)=>{
            setTimeout(() =>{
                if(this.#itemlist.length === 0){
                    reject("Nincs eladni való termék")
                }else{
                    resolve(this.#itemlist.pop())
        }
            }, 1000)
        })
    }
}

class Client {
    
    /**
     * @type {Vendor}
     */
    #vendor;

    constructor(vendor){
        this.#vendor = vendor;
        this.#vendor.itemCallback = (element) => {
            console.log("A kliens vett egy " + element)
        }
        this.#vendor.noItemCallBack = (reason) => {
            console.log("A kliens nem vett semmit mert: " + reason)
        }
    }

    buyFromSeller(){
        this.#vendor.sellSomething()
    }

    buyFromSellerPromiseHandling(){
        this.#vendor.sellSomethingPromise().then((element) => {
            console.log("A kliens vett egy " + element)
        })
        .catch((reason) => {
            console.log("A kliens nem vett semmit mert: " + reason)
        })
        .finally(() =>{
            console.log("Vásároltunk")
        })
    }
}

const vendor = new Vendor(["krumpli"]);
const client = new Client(vendor);
client.buyFromSeller();
client.buyFromSellerPromiseHandling();
client.buyFromSellerPromiseHandling();