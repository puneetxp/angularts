import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface state {
  value: string;
  viewValue: string;
}
interface gstrate {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  userTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      bill: ['', Validators.required],
      date: ['', [ Validators.required]],
      state: [''],
      gstn: ['', [Validators.maxLength(15)]],
      rates: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      isEditable: [true]
    });
  }
  states: state[] = [
    {value: '07', viewValue: 'delhi'},
    {value: '06', viewValue: 'haryana'},
    {value: '09', viewValue: 'uttarpardesh'}
  ];

  gstrates: gstrate [] = [
    {value: '28', viewValue: '28%'},
    {value: '18', viewValue: '18%'},
    {value: '12', viewValue: '12%'},
    {value: '5', viewValue: '5%'},
    {value: '0', viewValue: '0%'}
  ];

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  addRow() {
    const control =  this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control =  this.userTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
  }

  toggleTheme() {
    this.mode = !this.mode;
    
  }
}
