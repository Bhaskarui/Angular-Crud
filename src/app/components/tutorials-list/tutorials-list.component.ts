import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';
  constructor(private tutorialService: TutorialService) { }
  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe(
        (data: any) => {
          this.tutorials = data;
          console.log(data);
        },
        (error: any) => {
          console.log(error);
        });
        
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = undefined;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe(
        (response: any) => {
          console.log(response);
          this.refreshList();
        },
        (error: any) => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.tutorialService.findByTitle(this.title)
      .subscribe(
        (data: any) => {
          this.tutorials = data;
          console.log(data);
        },
        (error: any) => {
          console.log(error);
        });
  }

}
