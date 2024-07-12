import {Component, Input} from '@angular/core';
import {HireService} from "../../Services/hire.service";

@Component({
  selector: 'app-hire-modal',
  standalone: true,
  imports: [],
  templateUrl: './hire-modal.component.html',
  styleUrl: './hire-modal.component.css'
})
export class HireModalComponent {
  @Input() employeeId: string = "";

constructor(private hireService: HireService) {
}
  projectName = "";
  projectLocation="" ;
  projectBudget = "";
  projectDuration = "";
  projectType = "";

  onProjectNameChange(event: any){
    this.projectName = event.target.value;
  }

  onProjectLocationChange(event: any){
    this.projectLocation = event.target.value;
  }

  onProjectBudgetChange(event: any){
    this.projectBudget = event.target.value
  }

  onProjectDurationChange(event: any){
    this.projectDuration = event.target.value
  }

  onProjectTypeChange(event: any){
    this.projectType = event.target.value
  }

  confirmHire() {
    const projectData = new FormData();
    projectData.append("projectId", "0");
    projectData.append("projectName", this.projectName);
    projectData.append("projectOwner", localStorage.getItem('Id') ?? "");
    projectData.append("projectWorker", this.employeeId);
    projectData.append("projectLocation", this.projectLocation);
    projectData.append("projectBudget", this.projectBudget);
    projectData.append("projectDuration", this.projectDuration);
    projectData.append("projectType", this.projectType);
    projectData.append("projectStatus", "0");

    this.hireService.hire(projectData).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );

    console.log(projectData);
  }
}
