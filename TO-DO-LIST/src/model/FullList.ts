import ListItem from "./ListItem";
interface List{
list:ListItem[],
load():void,
save():void,
clearList():void,
addItem(itemobj:ListItem):void,
removeItem(id:string):void
}
export default class FullList implements List{
    static instance:FullList=new FullList()
    private constructor(private _list:ListItem[]=[]){}

load(): void {
    const storedList:string|null=localStorage.getItem("myList")
    if(storedList!== "String") return
    const parsedList:{_id:string,_item:string,_checked:boolean}[]=JSON.parse(storedList)
    parsedList.forEach(itemobj=>{
        const newListItem=new ListItem(itemobj._id,itemobj._item,itemobj._checked)
        FullList.instance.addItem(newListItem)
    })
}
    get list():ListItem[]{
        return this._list
    }
    save(): void {
        localStorage.setItem("myList",JSON.stringify(this._list))
    }
   clearList(): void {
       this._list=[]
       this.save()
   }
   addItem(itemobj: ListItem): void {
       this._list.push(itemobj)
       this.save()
   }
   removeItem(id: string): void {
       this._list=this._list.filter(item=>item.id!==id)
       this.save()
   }

}