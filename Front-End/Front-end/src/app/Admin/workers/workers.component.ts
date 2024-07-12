import {Component, OnInit} from '@angular/core';
import {FieldWorkersService} from "../../../Services/Admin/field-workers.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-workers',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './workers.component.html',
  styleUrl: './workers.component.css'
})
export class WorkersComponent implements OnInit{

  constructor(private fieldWorker: FieldWorkersService) {
  }
  fieldWorkers: any[] = [];
  ngOnInit() {
    this.loadFieldWorkers()
  }

  loadFieldWorkers(){
      this.fieldWorker.getAllWorkers().subscribe(
        (data: any) => {
          this.fieldWorkers = data.body
          console.log(this.fieldWorkers);
        },
        error => {
          console.error("Error While get FieldWorkers", error)
        }
      )
  }
}
