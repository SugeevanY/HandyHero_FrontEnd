import {Component, OnInit} from '@angular/core';
import {FieldWorkersService} from "../../../Services/Admin/field-workers.service";
import {NgForOf, NgIf} from "@angular/common";
import {FieldWorkerHandleService} from "../../../Services/Admin/field-worker-handle.service";

@Component({
  selector: 'app-worker-request',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './worker-request.component.html',
  styleUrl: './worker-request.component.css'
})
export class WorkerRequestComponent implements OnInit{

  workers: any[] = [];
  requests: any[] = [];
  constructor(private fieldWorkers: FieldWorkersService, private workerHandle: FieldWorkerHandleService) {
  }

  ngOnInit() {
    this.loadRequest()
  }

  loadRequest(){

  }

  filterRequest(){
    this.requests = this.workers.filter(worker => worker.acceptOrRejectBy === 0 || worker.status === "false");
  }

  accept(mail: string){
    let userId = Number(localStorage.getItem('Id'));
    this.workerHandle.accept(userId, mail).subscribe(
      (response) => {
        console.log("Accepted / unblocked successfully:", mail);
      },
      (error) => {
        console.error("Error while blocking:", error);
        // Optionally, handle error here
      }
    );
  }

  reject(email: string){
    let userId = Number(localStorage.getItem('Id'));
    this.workerHandle.block(userId, email).subscribe(
      (response) => {
        console.log("Blocked successfully:", email);
      },
      (error) => {
        console.error("Error while blocking:", error);
        // Optionally, handle error here
      }
    );
  }

}
