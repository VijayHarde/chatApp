import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db:SQLiteObject;
  constructor(private sqlite: SQLite,) {
    this.init();
   }

  init(){
    // this.sqlite.create({
    //   name: 'chats.db',
    //   location: 'default'
    // })
    //   .then((res: SQLiteObject) => {
    //       this.db = res;
    //     res.executeSql("CREATE TABLE IF NOT EXISTS chats (id INTEGER PRIMARY KEY AUTOINCREMENT , message TEXT , 'receiver' TEXT , 'sender' TEXT , createdAt TEXT)", [])
    //       .then(() => console.log('table Create'))
    //       .catch(e => console.log(e));
    //   })
    //   .catch(e => console.log(e));
  }

 public insert(message:string,to:string,from:string,createdAt:string){
    // console.log(message);
    // console.log(to);
    // console.log(from);
    // console.log(createdAt);
    this.db.executeSql(`INSERT INTO chats ('message' , 'receiver' ,'sender' ,'createdAt') VALUES(?,?,?,?)`,[message,to,from,createdAt])
    .then(res => console.log("Inserted"))
    .catch(e => console.log(e));
  }

  readMessages(senderId:string,receiverId:string){
    console.log(senderId)
    console.log(receiverId)
    this.db.executeSql(`SELECT * FROM chats WHERE receiver IN ('${senderId}', '${receiverId}') AND sender IN ('${senderId}', '${receiverId}') `,[])
    .then((res) => {
      const result = [];
      for (let i = 0; i < res.rows.length - 1; i++) {
        result.push(res.rows.item(i));
      }
      return result;
    })
    .catch(e => {
      console.log(e);
    })
  }

}
