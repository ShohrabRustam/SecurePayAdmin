import { Component, OnInit, ViewChild } from '@angular/core';
// import { PChildDailogComponent } from '../p-child-dailog/p-child-dailog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-child-request',
  templateUrl: './child-request.component.html',
  styleUrls: ['./child-request.component.scss']
})
export class ChildRequestComponent implements OnInit {

  displayedColumns: string[] = ['id','first_name', 'last_name', 'dob', 'email','gender','phone_number','monthly_limit','parent_id','is_approved', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog: MatDialog, public api : ApiService) {
    this.api.showPendingChild();
   }

  ngOnInit(): void {
    this.showPendingChild();
  }
  childReject(id:any){
    this.api.childReject(id).subscribe({
      next:(response)=>{
        alert("Request Rejected ");
        this.showPendingChild();
      },
      error:(error)=>{
        console.log(error);
        alert("Something wrong ")
      }
    })
  }

  approveChild(id:any){

this.api.approveChild(id).subscribe({
      next:(response)=>{
        // console.error('Request Accepted ');
        alert("Child Request Accepted ");
        this.showPendingChild();
        return 0;
      },
      error:(error)=>{
        console.log(error);
        alert("Something wrong ");
      }
    })
  }


  showPendingChild(){
    this.api.showPendingChild().subscribe({
      next:(response)=>{
        this.dataSource= new MatTableDataSource(response);
        console.log(this.dataSource);
      },
      error:(error)=>{
        console.log("Error while fetching Records !! ");
        alert("Error while fetching Records !! ");
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
