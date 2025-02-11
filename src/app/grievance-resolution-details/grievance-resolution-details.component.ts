/* 
* AMRIT – Accessible Medical Records via Integrated Technology 
* Integrated EHR (Electronic Health Records) Solution 
*
* Copyright (C) "Piramal Swasthya Management and Research Institute" 
*
* This file is part of AMRIT.
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see https://www.gnu.org/licenses/.
*/


import { Component, OnInit, Output, Input, EventEmitter, Directive, ViewChild } from '@angular/core';
import { CoFeedbackService } from '../services/coService/co_feedback.service';
import { dataService } from '../services/dataService/data.service'
import { FeedbackStatusComponent } from './../feedback-status/feedback-status.component'
import { ConfirmationDialogsService } from './../services/dialog/confirmation.service'
import { SetLanguageComponent } from 'app/set-language.component';
import { MdDialog } from '@angular/material';
import { HttpServices } from 'app/services/http-services/http_services.service';
import { GrievanceTransactionDetailsComponent } from '../grievance-transaction-details/grievance-transaction-details.component';
declare var jQuery: any;

@Component({
  selector: 'app-grievance-resolution-details',
  templateUrl: './grievance-resolution-details.component.html',
  styleUrls: ['./grievance-resolution-details.component.css']
})
export class GrievanceResolutionDetailsComponent implements OnInit {

  @ViewChild('form') form;
  beneficiaryRegID: any;
  userName: any;
  count:any;
  providerServiceMapID: number;
  userID: number;
  currentLanguageSet: any;
  remark: any;
  complaintResolution:any;
  complaintSubject:any;
  complaint:any;
  transactionList:any=[];
  complaintID:any;
  resolutionMaster:any=["Resolved", "Unresolved"];
  grievanceSelectedBenData:any;
  subjectOfComplaint:any;

  constructor(
    private coFeedbackService: CoFeedbackService,
    private savedData: dataService,
    private alertMessage: ConfirmationDialogsService,
    public dialog: MdDialog,
    private httpServices:HttpServices
  ) {

  }

  ngOnInit() {
    this.grievanceSelectedBenData = this.savedData.outboundGrievanceData;
    this.beneficiaryRegID = this.grievanceSelectedBenData.beneficiaryRegID;
    this.userName = this.savedData.uname;
    this.providerServiceMapID = this.savedData.current_service.serviceID;
    this.userID = this.savedData.uid;
    this.count = '0/300';
    this.assignSelectedLanguage();
    this.setComplaintDetails();

  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.assignSelectedLanguage();
  }

  setComplaintDetails() {
    if(this.grievanceSelectedBenData){
    this.complaintID = this.grievanceSelectedBenData.complaintID;
    this.complaintSubject =  this.grievanceSelectedBenData.subjectOfComplaint;
    this.complaint = this.grievanceSelectedBenData.complaint;
    // this.comments = this.grievanceSelectedBenData.comments;
    this.transactionList = this.grievanceSelectedBenData.transaction
    }
  }
  

  submitComplaintResolution() {

    const feedbackObj = {
      'complaintID': this.complaintID,
      'complaintResolution': this.complaintResolution,
      'remark': this.remark,
      'beneficiaryRegID': this.beneficiaryRegID,
      'providerServiceMapID': this.providerServiceMapID ? this.providerServiceMapID : null,
      'userID': this.savedData.uid,
      'createdBy': this.userName,
      'benCallID': this.savedData.callData.benCallID
    };
    this.coFeedbackService.saveComplaintResolution(feedbackObj)
      .subscribe((response) => {
        if(response && response.statusCode === 200) {
        this.alertMessage.alert(response.response, 'success');
        }

      }, (err) => { 
        this.alertMessage.alert(err.errorMessage, 'error');
      });
  }
  

  updateCount() {
    this.count = this.remark.length + '/300';
  }

  getPreviousTransactionHistory() {
    let dialog = this.dialog.open(GrievanceTransactionDetailsComponent, {
      width: '700px',
      disableClose: true,
      data: this.transactionList
    });
  
  }
 
  ngDoCheck() {
    this.assignSelectedLanguage();
  }

  assignSelectedLanguage() {
		const getLanguageJson = new SetLanguageComponent(this.httpServices);
		getLanguageJson.setLanguage();
		this.currentLanguageSet = getLanguageJson.currentLanguageObject;
	  }

   
}



