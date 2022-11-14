import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  name: string = ""
  position: string = ""
  department: string = ""
  showModal: boolean = false
  editMode: boolean = false
  employees: any
  delete: boolean = true
  id: any
  constructor(private emp: EmployeesService) { }

  ngOnInit(): void {
    this.ongetemployee()

  }

  ongetemployee() {
    this.emp.getEmplyeelist().subscribe((result: any) => {
      console.log("get", result);
      this.employees = result
      console.log("emp", this.employees);

    }, (result: any) => {
      console.log("get", result);

    })
  }

  onEmpSubmit() {


    if (this.editMode) {
      
      this.emp.updateEmployee(this.name, this.position, this.department, this.id).subscribe((result: any) => {
        console.log("post", result);
        this.ongetemployee()
        this.onClosemodal()
      }, (result: any) => {
        console.log("err", result);

      })

    } else {
      this.editMode = false
      this.emp.addemplyee(this.name, this.position, this.department).subscribe((result: any) => {
        console.log("post", result);
        this.ongetemployee()
        this.onClosemodal()
      }, (result: any) => {
        console.log("err", result);

      })
    }
    this.name = ''
    this.position = ''
    this.department = ''
  }

  ondeleatemployee(id: any) {
    window.location.reload()
    this.emp.deleteemployee(id).subscribe((result: any) => {
      console.log("delete", result);
      this.delete = false
    }, (result: any) => {
      console.log("delete", result);

    })

  }


  oneditEmployee(event: any) {
    this.id = event._id
    console.log(this.id);

    this.editMode = true
    this.showModal = true
  }



  Onaddemployee() {
    this.showModal = true
  }



  onClosemodal() {
    this.showModal = false
  }




}
