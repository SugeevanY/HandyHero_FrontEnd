import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FieldWorkersService} from "../../../Services/Admin/field-workers.service";
import {FieldWorkerHandleService} from "../../../Services/Admin/field-worker-handle.service";
import {ProjectRequestService} from "../../../Services/project-request.service";

@Component({
  selector: 'app-project-request',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './projectrequest.component.html',
  styleUrl: './projectrequest.component.css'
})
export class ProjectRequestComponent implements OnInit {

  project: any[] = [];
  requests: any[] = [];

  constructor(private fieldWorkers: FieldWorkersService, private workerHandle: FieldWorkerHandleService, private projectRequestService: ProjectRequestService) {
  }

  ngOnInit() {
    this.loadRequest()
  }

  loadRequest() {
    this.projectRequestService.getProjects().subscribe(
      (data) => {
        this.project = data;
        this.filterRequest(); // Filter the requests after loading the projects
        console.log(this.project)
        console.log(this.requests)
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  filterRequest() {
    this.requests = this.project.filter(request => request.projectStatus === 0 || request.projectStatus === "false");
  }


  approveRequest(request: any) {
    this.projectRequestService.acceptProject(request).subscribe(
      (response) => {
        console.log('Project approved:', response);
        this.loadRequest(); // Reload requests after approval
      },
      (error) => {
        console.error('Error approving project:', error);
      }
    );
  }

  rejectRequest(request: any) {
    this.projectRequestService.rejectProject(request).subscribe(
      (response) => {
        console.log('Project rejected:', response);
        this.loadRequest(); // Reload requests after rejection
      },
      (error) => {
        console.error('Error rejecting project:', error);
      }
    );
  }

}
