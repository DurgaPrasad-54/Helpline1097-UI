import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { CallServices } from './../services/callservices/callservice.service';
import { dataService } from './../services/dataService/data.service';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { ConfirmationDialogsService } from '../services/dialog/confirmation.service';
import { CzentrixServices } from './../services/czentrix/czentrix.service';
import { OutboundReAllocationService } from "../services/outboundServices/outbound-call-reallocation.service";
import { SetLanguageComponent } from 'app/set-language.component';
import { HttpServices } from 'app/services/http-services/http_services.service';
import {ComplaintDescriptionDialogComponent} from '../complaint-description-dialog/complaint-description-dialog.component';

@Component({
  selector: 'app-grievance-outbound-worklist',
  templateUrl: './grievance-outbound-worklist.component.html',
  styleUrls: ['./grievance-outbound-worklist.component.css']
})
export class GrievanceOutboundWorklistComponent implements OnInit {

  @Output() onOutboundCall: EventEmitter<any> = new EventEmitter<any>();
  grievanceOutboundData: any = [];
  filteredSearchResult: any = [];
  currentLanguageSet: any;
  benDetailsList: any;
  constructor(private czentrixServices : CzentrixServices, private outBoundService: CallServices, private outboundReAllocationService: OutboundReAllocationService,
    public alertService: ConfirmationDialogsService, private commonDataService: dataService, public router: Router,
    public dialog: MdDialog, private httpServices:HttpServices) {
  }
  
  ngOnInit() {
    this.commonDataService.sendHeaderStatus.next("");
    const serviceProviderMapID = this.commonDataService.current_service.serviceID;
    const userId = this.commonDataService.uid;
    let reqObj = {
      "providerServiceMapId": serviceProviderMapID,
      "agentId": userId
    };  
    this.outboundReAllocationService.getGrievanceOutboundCallList(reqObj).subscribe(response => 
      {
        this.assignResponse(response);
      },
    (err)=> {
      this.alertService.alert(err.errorMessage,'error');
    });
    this.assignResponse([]);
    this.assignSelectedLanguage();

  };

  assignResponse(outboundHistory: any) {
    outboundHistory = [
      {
          "complaintID": "FE\/65\/11122024\/1636",
          "subjectOfComplaint": "Complaint against ART center",
          "complaint" : "NAME BABU LAL , AGE 43 , MOBILE NO 9929432998, ART NO 2194, ART CENTER NAME   GOVT MEDICAL HOSPITAL, BARMER ,RAJASTHAN  Babu Lal has reported an issue at the Govt Medical Hospital in Barmer, Rajasthan, where the lab technician is allegedly refusing to conduct his CD4 count and viral load tests. The technician is said to be acting in an unprofessional manner, which is causing inconvenience and problems for the patient.",
          "beneficiaryRegID": 2347002,
          "providerServiceMapId": 89,
          "firstName": "Babu",
          "lastName": "Lal",
          "primaryNumber": "9929432998",
          "transaction": [
                {
                    "actionTakenBy": "Admin",
                    "status": "Close",
                    "fileName": null,
                    "fileType": null,
                    "redressed": "Yes",
                    "createdAt": "2024-12-11 16:00:33",
                    "updatedAt": "2024-12-11 16:00:33",
                    "comment": "Grievance is closed by GR Admin"
                },
                {
                    "actionTakenBy": "Rajasthan",
                    "status": "Open",
                    "fileName": "https:\/\/grievance1097naco.piramalswasthya.org\/grsbepro\/igemr1097\/public\/storage\/uploads\/2024-12-11-14-36-19-382937.pdf",
                    "fileType": "pdf",
                    "redressed": "No",
                    "createdAt": "2024-12-11 14:36:19",
                    "updatedAt": "2024-12-11 14:36:19",
                    "comment": "Attached concern E-mail"
                }
            ],
          "severety": "Non-Emergency",
          "state": "Rajasthan",
          "agentId": 327,
          "deleted": false,
          "createdBy": "nacotwo",
          "createdDate": "2024-12-13T19:34:09.000Z",
          "lastModDate": "2024-12-13T19:34:09.000Z",
          "isCompleted": false,
          "gender": "Male",
          "district": "Barmer",
          "beneficiaryID": 283440942211,
          "age": "43 years",
          "retryNeeded": false,
          "callCounter": 1,
          "lastCall": "2024-12-02 12:34 PM"
      },

   {
          "complaintID": "FE\/65\/11122024\/1637",
          "subjectOfComplaint": "",
          "complaint" : "NAME Mohan Kumar , AGE 32 , MOBILE NO 9591682576, ART NO 2195, ART CENTER NAME   GOVT MEDICAL HOSPITAL, BARMER ,RAJASTHAN  Babu Lal has reported an issue at the Govt Medical Hospital in Barmer, Rajasthan, where the lab technician is allegedly refusing to conduct his CD4 count and viral load tests. The technician is said to be acting in an unprofessional manner, which is causing inconvenience and problems for the patient.",
          "beneficiaryRegID": 2347003,
          "providerServiceMapId": 89,
          "firstName": "Mohan",
          "lastName": "Kumar",
          "primaryNumber": "9591682576",
          "transaction": [
                {
                    "actionTakenBy": "Admin",
                    "status": "Close",
                    "fileName": null,
                    "fileType": null,
                    "redressed": "Yes",
                    "createdAt": "2024-12-02 30:00:33",
                    "updatedAt": "2024-12-02 16:00:33",
                    "comment": "Grievance is closed by GR Admin"
                },
                {
                    "actionTakenBy": "Rajasthan",
                    "status": "Open",
                    "fileName": "https:\/\/grievance1097naco.piramalswasthya.org\/grsbepro\/igemr1097\/public\/storage\/uploads\/2024-12-11-14-36-19-382937.pdf",
                    "fileType": "pdf",
                    "redressed": "No",
                    "createdAt": "2024-12-11 14:36:19",
                    "updatedAt": "2024-12-11 14:36:19",
                    "comment": "Attached concern E-mail"
                }
            ],
          "severety": "Non-Emergency",
          "state": "Rajasthan",
          "agentId": 327,
          "deleted": false,
          "createdBy": "nacotwo",
          "createdDate": "2024-12-13T19:34:09.000Z",
          "lastModDate": "2024-12-13T19:34:09.000Z",
          "isCompleted": false,
          "gender": "Male",
          "district": "Barmer",
          "beneficiaryID": 483440942212,
          "age": "32 years",
          "retryNeeded": false,
          "callCounter": 0,
          "lastCall": "2024-12-02 12:34 PM"
      },
      
];
    this.grievanceOutboundData = outboundHistory;
    this.filteredSearchResult = outboundHistory;
  }

  listBenDetailsOnPhoneNo(data: any) {

    this.commonDataService.outboundBenRegID = data.beneficiaryRegId;

  
   
    this.commonDataService.outboundGrievanceData = data;

    // sessionStorage.setItem("isOnCall", "yes");
    // sessionStorage.setItem("isGrievanceCall", "yes");
    // this.commonDataService.callerNumber = data.primaryNumber;
    // this.router.navigate(['MultiRoleScreenComponent/InnerpageComponent']);

          this.czentrixServices.manualDialaNumber("", data.primaryNumber).subscribe((res) => {
            if (res.status.toLowerCase() === 'fail') {
              this.alertService.alert(this.currentLanguageSet.somethingWentWrongInCalling, 'error');
            } else {
              this.commonDataService.callerNumber = data.primaryNumber;

              sessionStorage.setItem("isOnCall", "yes");
              sessionStorage.setItem("isGrievanceCall", "yes");
            }
          }, (err) => {
            this.alertService.alert(err.errorMessage);
          });
       
  }
  backToDashBoard() {
    this.router.navigate(['/MultiRoleScreenComponent/dashboard']);

  }


  filterComponentList(searchTerm?: string) {
    if (!searchTerm) {
      this.filteredSearchResult = this.grievanceOutboundData;
    } else {
      this.filteredSearchResult = [];
      this.grievanceOutboundData.forEach((item) => {
        for (let key in item) {
          if (key === 'complaintID' || key === 'subjectOfComplaint' || key === 'severety' || key === 'state') {
            let value: string = '' + item[key];
            if (value.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
              this.filteredSearchResult.push(item); break;
            }
          }
        }
      });
    }

  }

  viewComplaintDesc(complaintData:any) {
  
	    let dialog = this.dialog.open(ComplaintDescriptionDialogComponent, {
	      width: '700px',
	      disableClose: true,
	      data: {
	        type: this.currentLanguageSet.kmDocs,
	        complaintData: complaintData
	      }
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

