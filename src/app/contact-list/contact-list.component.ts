import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ContactListModel} from './contact-list.model'
import {ContactListApiService} from '../shared/contact-list-api.service'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  showAddBtn :boolean
  showUpdateBtn: boolean;
  formValue: FormGroup; 
  contactListModelObj: ContactListModel = new ContactListModel();
  contacts: any;
  constructor(
    private formBuilder:FormBuilder,
    private contactListApiService : ContactListApiService 
  ) { }

  ngOnInit(): void {
    this.formValue =this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email:['', Validators.email],
      profilePhoto: ['']
    });
    this.getAllContactDetail();
  }
  /**
   * Open Add contect form 
   */
  addContect() {
    this.formValue.reset();
    this.showAddBtn = true;
    this.showUpdateBtn =false;
  }

  /**
   * Post Contact list
   */
  postContactDetail() {
    this.contactListModelObj.firstName = this.formValue.value.firstName;
    this.contactListModelObj.lastName = this.formValue.value.lastName;
    this.contactListModelObj.email = this.formValue.value.email;
    this.contactListModelObj.image = this.formValue.value.image;
    this.contactListApiService.postContact(this.contactListModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Contact Added Sucessfully");
      // let ref = document.getElementById('cancel');
      // ref?.click();
      this.formValue.reset();
      this.getAllContactDetail();
    },
    err=>{
      alert("something went wrong");
    });
  }

  /**
   * Get  all contect detail  
   */
  getAllContactDetail() {
    this.contactListApiService.getContact()
    .subscribe(res=>{
      this.contacts= res;
    })
  }

  /**
   * Delete Contact detail 
   * @param contact 
   */
  deleteContact(contact?:any) {
    this.contactListApiService.deleteContact(contact.id) 
    .subscribe(res=>{
      alert("Contect get deleted");
      this.getAllContactDetail();
    });
    
  }

  /**
   * open Edit From list
   * @param row 
   */
  onEdit(row: any) {
    this.contactListModelObj.id= row.id;
    this.showAddBtn = false;
    this.showUpdateBtn = true;
    //this.formValue.controls['image'].setValue(row.image)
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
  }

  /**
   * update Contact list on edit 
   */
  updateContactDetail() {
    this.contactListModelObj.firstName = this.formValue.value.firstName;
    this.contactListModelObj.lastName = this.formValue.value.lastName;
    this.contactListModelObj.email = this.formValue.value.email;
    this.contactListModelObj.image = this.formValue.value.image;
    this.contactListApiService.updateContact(this.contactListModelObj,this.contactListModelObj.id)
    .subscribe(res=>{
      this.getAllContactDetail();
    })
  }
}
