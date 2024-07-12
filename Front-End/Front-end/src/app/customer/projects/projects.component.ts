import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../card/card.component";
import {NgForOf} from "@angular/common";
import {ProjectsService} from "../../../Services/Customer/projects.service";
import {StarRatingComponent} from "../../star-rating/star-rating.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    StarRatingComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit{

  projects: any[] = [];
  projectsStatic: any[] = [];

  constructor(private projectService: ProjectsService) {
  }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects(){
    let userId = localStorage.getItem('Id');
    this.projectService.getMyProjects(userId).subscribe(
      (data) => {
        console.log(data)
        this.projects = data;
        this.projectsStatic = data.slice();
      },
      (error) => {
        console.log("error while getting projects : ", error);
      }
    )
  }

  searchWord = "";


  onSearchChange(event:any){
    this.searchWord = event.target.value;
    this.searchProject();
    console.log(this.projects);
    console.log(this.projectsStatic);
  }
  searchProject() {
    if (this.searchWord.trim() === '') {
      this.projects = this.projectsStatic.slice();
      return;
    }

    const searchFilter = (project: any) =>
      project.projectName.toLowerCase().includes(this.searchWord.toLowerCase());

    this.projects = this.projectsStatic.filter((project: any) => {
      const result = searchFilter(project);
      console.log(`Project: ${project.projectName}, Matched: ${result}`);
      return result;
    });
  }



}
