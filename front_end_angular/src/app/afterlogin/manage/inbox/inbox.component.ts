import { Component, OnInit,ViewEncapsulation,AfterViewInit } from '@angular/core';
import { IssueService } from '../../../issue.service';
import { UserService } from '../../../user.service';
import { CategoriesListService } from '../../../categories-list.service';
import { UserConnectionsService } from '../../../user-connections.service';
import { Router } from '@angular/router'
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InboxComponent implements OnInit {
  private connected_users:Array<any>;
  private messages:Array<any>;
  private empty:boolean = true;
  private page:number=0;
  private user_2:string;
  private active_user: Element;
  private button_disable:boolean = true;
  constructor(private issue:IssueService,private router: Router,private user:UserService, private routeactive : ActivatedRoute,private user_conn:UserConnectionsService) { 
  			this.routeactive.data.forEach(data =>{
              this.connected_users = data.connections;
           });
  			this.button_disable =true;
  			console.log(this.connected_users);
  }
  		
  ngOnInit() {
  		
  }
  ngAfterViewInit(){
  		this.active_user = document.getElementById(this.connected_users[0]);
  		console.log(this.active_user);
   }
   onSend(){
   		let message = (<HTMLInputElement>document.getElementById("textmessage")).value;
   		let headers = new HttpHeaders().set('Authorization','Bearer ' + this.user.getToken());
   		console.log(message);
   		let data = {
   				"username" : this.user.getUser(),
   				"user_conn" : this.user_2,
   				"message" : message
   		}
   		this.issue.postMessage(data,headers)
   		.toPromise()
   		.then((res:any)=>{
   				alert("your message have been send");

   		})
   		.catch((err)=>{
   			console.log(err);
   		});
   }
  onScroll(){

  		let list = document.getElementById("message_list");
  		let headers = new HttpHeaders().set('Authorization','Bearer ' + this.user.getToken());
  		if (list.scrollTop=== 0) {
  				this.page = this.page + 1;
  				let data = { "username" : this.user.getUser(),
  				  "user_conn" : this.user_2,
  				  "page" : this.page
  				}
    			this.issue.getUserConnMessages(data,headers)
    			.toPromise()
    			.then((res:any)=>{
    				let first_time = true;
    				let list = document.getElementById("message_list")
    				if(res.messages.length>0){
    					this.messages = res.messages;
    					console.log(this.messages);
    					for(let i=this.messages.length-1;i>=0;i--){
    							if(this.messages[i].sender===this.user.getUser()){
    									if(first_time===true){
    										let hr = document.createElement('hr');
					  				   		hr.className = "hrchat";
					  				   		list.insertBefore(hr,list.childNodes[0]);
					  				   		first_time = false;
    									}
    							    let br = document.createElement("br");
    							    list.insertBefore(br,list.childNodes[0]);
    							    let li = document.createElement("li");
    							    li.className = "mymessage";
    							    let message = document.createTextNode(this.messages[i].message);
  				   					li.appendChild(message);
  				   					list.insertBefore(li,list.childNodes[0]);
  				   					if(i!==0){
  				   						if(this.messages[i-1].sender!==this.user.getUser()){
  				   							let h4 = document.createElement('h4');
  				   							h4.className = "mymessagename";
  				   							let h4_text = document.createTextNode("Me: ");	
  				   							h4.appendChild(h4_text);
  				   							let hr = document.createElement('hr');
  				   							hr.className = "hrchat";
  				   							list.insertBefore(h4,list.childNodes[0]);
  				   							list.insertBefore(hr,list.childNodes[0]);
  				   						}
  				   					}
  				   					else{
  				   						let h4 = document.createElement('h4');
  				   						h4.className = "mymessagename";
  				   						let h4_text = document.createTextNode("Me: ");	
  				   						h4.appendChild(h4_text);
  				   						list.insertBefore(h4,list.childNodes[0]);
  				   					}

    							}
    							else{
    								if(first_time===true){
    										let hr = document.createElement('hr');
					  				   		hr.className = "hrchat";
					  				   		list.insertBefore(hr,list.childNodes[0]);
					  				   		first_time = false;
    								}
    								let br = document.createElement("br");
    							    list.insertBefore(br,list.childNodes[0]);
    							    let li = document.createElement("li");
    							    li.className = "othermessage";
    							    let message = document.createTextNode(this.messages[i].message);
  				   					li.appendChild(message);
  				   					list.insertBefore(li,list.childNodes[0]);
  				   					if(i!==0){
  				   						if(this.messages[i-1].sender!==this.user_2){
  				   							let h4 = document.createElement('h4');
  				   							h4.className = "othermessagename";
  				   							let h4_text = document.createTextNode(this.user_2+": ");	
  				   							h4.appendChild(h4_text);
  				   							let hr = document.createElement('hr');
  				   							hr.className = "hrchat";
  				   							list.insertBefore(h4,list.childNodes[0]);
  				   							list.insertBefore(hr,list.childNodes[0]);
  				   						}
  				   					}
  				   					else{
  				   						let h4 = document.createElement('h4');
  				   						h4.className = "othermessagename";
  				   						let h4_text = document.createTextNode(this.user_2+": ");	
  				   						h4.appendChild(h4_text);
  				   						list.insertBefore(h4,list.childNodes[0]);
  				   					}


    						}
    					}
              
   					}	
				    else{
				    	// let p = document.createElement("p");
				    	// let p_text = document.createTextNode("No more messages");
				    	// p.appendChild(p_text);
				    	// list.insertBefore(p,list.childNodes[0]);
						console.log("no more messages");
				    }
				    				
    			})
    			.catch((err)=>{

    			})
  		}
}
  onSelectConnection(event:Event){
  	let element = event.target as HTMLElement;
  	console.log(element.innerText);
  	this.user_2 = element.innerText;
  	if(element.tagName === 'SPAN'){
  		let parent = element.parentElement;
  		element = parent;
  	}
  	if(this.active_user!==element){
  		 this.active_user.classList.remove("active_user");
  	}
  	if(!element.classList.contains("active_user")){
  		this.button_disable = false;
  		document.getElementById("message_list").innerText="";
  		this.page =0;
  		element.classList.add("active_user");
  		this.active_user = element;
  	let headers = new HttpHeaders().set('Authorization','Bearer ' + this.user.getToken());
  	let data = { "username" : this.user.getUser(),
  				  "user_conn" : element.innerText,
  				  "page" : '0'
  				}
  	this.issue.getUserConnMessages(data,headers)
  	.toPromise()
  	.then((res:any)=>{
  		this.messages = res.messages;
  		this.empty = false;
  		let last_user:string;
  		let first_time = true;
  		if(this.messages.length!==0){
  		for(let i = this.messages.length-1;i>=0;i--){
  			console.log(this.messages[i].sender);
  			if(this.messages[i].sender===this.user.getUser()){
  				if(first_time===true || this.messages[i].sender!==last_user){
  				   if(first_time===false){
  				   		let hr = document.createElement('hr');
  				   		hr.className = "hrchat";
  				   		document.getElementById("message_list").appendChild(hr);
  				   }
  				   let hr = document.createElement('hr');
  				   hr.className = "hrchat";
  				   let node_name = document.createElement('h4');
  				   node_name.className= "mymessagename";
  				   let node_name_text = document.createTextNode('Me: ');
  				   node_name.appendChild(node_name_text);
  				   document.getElementById("message_list").appendChild(node_name);
  				}
  				   let br = document.createElement('br');
  				   let node_mes = document.createElement("LI");
  				   node_mes.className ="mymessage";
				   let newmessage = document.createTextNode(this.messages[i].message);
				   node_mes.appendChild(newmessage);
				   document.getElementById("message_list").appendChild(node_mes);
				   document.getElementById("message_list").appendChild(br);
				   last_user = this.messages[i].sender;
				   first_time = false;
  			}
  			else{
  				if(first_time===true || this.messages[i].sender!==last_user){
  					if(first_time===false){
  				   		let hr = document.createElement('hr');
  				   		hr.className = "hrchat";
  				   		document.getElementById("message_list").appendChild(hr);
  				    }
  				   let node_name = document.createElement('h4');
  				   node_name.className= "othermessagename";
  				   let node_name_text = document.createTextNode(this.messages[i].sender+": ");
  				   node_name.appendChild(node_name_text);
  				   document.getElementById("message_list").appendChild(node_name);
  				}
  				   let br = document.createElement('br');
  				   let node_mes = document.createElement("LI");
  				   node_mes.className = "othermessage";
				   let newmessage = document.createTextNode(this.messages[i].message);
				   node_mes.appendChild(newmessage);
				   document.getElementById("message_list").appendChild(node_mes);
				   document.getElementById("message_list").appendChild(br);
				   last_user = this.messages[i].sender;
				   first_time = false;
  			}
  		}
  		}
  		else
  		{	
  			let p = document.createElement("p");
  			p.classList.add("nomessage")
  			let span = document.createElement("span");
  			span.classList.add("nomessagespan");
  			let text = document.createTextNode("No Messages yet with this user");
  			p.appendChild(span);
  			span.appendChild(text);
  			document.getElementById("message_list").appendChild(p);
  			console.log("no messages yes");
  		}
  		let list = document.getElementById("message_list");
  		console.log(list)
		list.scrollTop = list.scrollHeight;
		console.log(list.scrollTop);
  		console.log(this.messages);
  	})
  	.catch((err)=>{
  		console.log(err);
  	});
  }
  }
}
