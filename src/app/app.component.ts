import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  constructor(private employeesService: EmployeeService){}

  ngOnInit() {
      this.getEmployees();
  }

  public getEmployees(): void{
    this.employeesService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void{
    document.getElementById('add-employee-from')?.click();
    this.employeesService.addEmployee(addForm.value).subscribe(
      (respose: Employee) => {
        console.log(respose);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onUpdateEmployee(employee: Employee): void{
    this.employeesService.updateEmployee(employee).subscribe(
      (respose: Employee) => {
        console.log(respose);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteEmployee(employeeId: number): void{
    this.employeesService.deleteEmployee(employeeId).subscribe(
      (respose: void) => {
        console.log(respose);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void{
    const results: Employee[] = [];
    for (const employee of this.employees){
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.dateOfBirth.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.address.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
    }
    }
    this.employees = results;
    if (results.length=== 0 || !key){
      this.getEmployees();
    }
  }

  public onOpenModel(mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('date-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('date-target', '#addEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenModal(employee: Employee, mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('date-toggle', 'modal');

    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('date-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('date-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
