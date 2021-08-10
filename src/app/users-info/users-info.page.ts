import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { ChatService } from "../services/chat.service";

interface UserInfo {
  uid: string;
  email: string;
}

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.page.html',
  styleUrls: ['./users-info.page.scss'],
})
export class UsersInfoPage implements OnInit {
  userInfo: UserInfo[] = [];
  AllMessages: any[] = [];
  constructor(private afs: AngularFirestore,private router: Router,private chatService:ChatService) { 
    this.getinfo();    
  }

  ngOnInit() {
  }
/**
 * get the all user information from firebase
 */
  getinfo() {
    this.afs.collection<UserInfo>('users')
              .get()
              .subscribe((res) => {
                res.forEach((doc) => {
                  this.userInfo.push(doc.data());
              })
            })
}

onClick(id:string){
// console.log(id);
this.router.navigateByUrl('/home',{state:{id}});
}
}
