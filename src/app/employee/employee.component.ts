import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../_models';
import { AccountService } from '../_services';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  displayedColumns = ['id', 'employeeName','compneyRole'];
    dataSource: MatTableDataSource<UserData>;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    constructor() {
      // Create 100 users
      const users: UserData[] = [];
      for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
  
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
    }
  
    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  }
  
  /** Builds and returns a new User. */
  function createNewUser(id: number): UserData {
    const employeeName =
    EmployeeName[Math.round(Math.random() * (EmployeeName.length - 1))] + ' ' +
    EmployeeName[Math.round(Math.random() * (EmployeeName.length - 1))].charAt(0) + '.';
    const compneyRole =
         CompneyRole[Math.round(Math.random() * (CompneyRole.length - 1))] + ' ' +
         CompneyRole[Math.round(Math.random() * (CompneyRole.length - 1))].charAt(0) + '.';
    return {
      id: id.toString(),
      employeeName: employeeName,
      //progress: Math.round(Math.random() * 100).toString(),
     compneyRole: compneyRole,
    };
  }
  
  /** Constants used to fill up our data base. */
  const CompneyRole = ['Exploration & production', 'Shipbuilding', 'Broadcasting & entertainment', 'Building materials & fixtures', 'Airlines', 'Airlines', 'Airlines',
   'Airlines', 'Apparel retailers', 'Building materials & fixtures', 'Pharmaceuticals', 'Food products', 'Health care providers', 'Tires', 'Business training & employment agencies'];
  const EmployeeName = ['KAYLING	', 'BLAZE', 'CLARE', 'JONAS', 'SCARLET', 'FRANK',
    'ADELYN', 'KAYLING	', 'BLAZE', 'CLARE', 'JONAS', 'SCARLET', 'FRANK',
    'ADELYN','KAYLING	', 'BLAZE', 'CLARE', 'JONAS', 'SCARLET', 'FRANK',
    'ADELYN'];
  
  export interface UserData {
    id: string;
    employeeName: string;
   // progress: string;
    compneyRole: string;
  }
