import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
employe:any=[]
  constructor(private http:HttpClient) { }

  addemplyee(name:any,position:any,dept:any){
    const employee={
      name,
      position,
      dept,
    }
    return this.http.post('http://localhost:3000/employees/',employee)
  }
  getEmplyeelist(){
    return this.http.get('http://localhost:3000/employees')
  }
  deleteemployee(id:any){
    return this.http.delete('http://localhost:3000/employees/'+id)
  }
  updateEmployee(name:any,position:any,dept:any,id:any){
    const employee={
      name,
      position,
      dept,
    }
    return this.http.put('http://localhost:3000/employees/'+id,employee)
  }
  
}
