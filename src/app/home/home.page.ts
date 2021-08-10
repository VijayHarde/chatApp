import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { DatabaseService } from "../services/database.service";
import { firestore } from 'firebase-admin';
import { stringify } from '@angular/compiler/src/util';

export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  to: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  AllMessages: any[] = [];
  collectionList: any[] = [];
  receiverId: any;
  senderId: string;
  messages: Observable<any[]>;
  collectionName: string;
  collectionAltName: string;
  newMsg = '';

  constructor(private chatService: ChatService, private router: Router, private afs: AngularFirestore, private db: DatabaseService) {
    this.receiverId = this.router.getCurrentNavigation().extras.state;
    this.senderId = this.chatService.getcurrentUserId();
    this.collectionName = this.senderId + this.receiverId.id;
    this.collectionAltName = this.receiverId.id + this.senderId;
    this.getAllCollectionNames()
      .then(list => {
        this.messages = this.chatService.getChatMessages(this.currentCollection);
      })
      .catch(error => {
        console.error(error);
      });

  }

  ngOnInit() { }

  sendMessage() {
    // console.log(this.collectionName);
    this.chatService.addChatMessage(this.currentCollection, this.newMsg, this.receiverId).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

  getAllCollectionNames() {
    return new Promise((resolve, reject) => {
      this.afs.collection('collectionList')
        .get()
        .subscribe({
          next: (res) => {
            res.forEach((doc) => {
              this.collectionList.push(doc.id);
            });
          },
          complete: () => {
            resolve(this.collectionList);
          },
          error: (error) => {
            reject(error);
          }
        })
    });
  }

  get currentCollection(): string {

      for (let i = 0; i < this.collectionList.length; i++) {
        console.log(this.collectionList[i]);
        if (this.collectionList[i] == this.collectionName || this.collectionList[i] == this.collectionAltName) {
          console.log("in If loop")
          return this.collectionList[i];
        }
      }
      this.afs.collection("collectionList").doc(this.collectionName).set({});
      console.log("Not found");
      return this.collectionName;
    }
}