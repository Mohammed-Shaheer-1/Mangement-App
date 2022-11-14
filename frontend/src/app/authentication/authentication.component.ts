import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private fb:FormBuilder,private http:HttpClient,private route:Router) { }

  ngOnInit(): void {

    
  }
  registerForm=this.fb.group({
    name:[''],
    email:[''],
    password:['']
  })
  loginForm=this.fb.group({
    email:[''],
    password:['']
  })
  register(){
    let data=this.registerForm.value
   this.http.post('http://localhost:3000/employees/register/',data).subscribe((result:any)=>{

    this.route.navigateByUrl('employee')
   },(result:any)=>{
    console.log("errr");
    
   })
  }
  Login(){

   let data=this.loginForm.value
   console.log(data);
   
   this.http.post('http://localhost:3000/employees/login/',data).subscribe((result:any)=>{

    alert(result.message)
    this.route.navigateByUrl('employee')
   },(result:any)=>{
    console.log("err");
    
   })
   
  }
}
